import Header from "../Partials/Header";
import {Col, Container, Table, Button, Row, InputGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getWebsite} from "../lib/api";

export default function Website({navigation, route}) {
    const [website, setWebsite] = useState(route.params.website);
    const [data, setData] = useState(false);
    const [commitMsg, setCommitMsg] = useState('');
    const [refresher, setRefresher] = useState(0);

    useEffect(() => {
        getWebsite(website).then((websiteData) => {
            setData(websiteData);
        })
    }, [refresher])

    const handleCommitButtonClick = () => {
        navigation.navigate('CommandRunning', {commandName:'commit', commandData: {'message': commitMsg}, website: website, setRefresher: setRefresher, lastPage: 'Website', lastPageOptions: {website: website}});
        setCommitMsg('');
    }

    const handleCommitMsgChange = (e) => {
        setCommitMsg(e.target.value);
    }

    const handleChangeBranch = (branch) => {
        navigation.navigate('CommandRunning', {commandName:'changeBranch', commandData: {'branch': branch}, website: website, setRefresher: setRefresher, lastPage: 'Website', lastPageOptions: {website: website}});
    }

    const handleMerge = () => {
        navigation.navigate('CommandRunning', {commandName:'merge', commandData: {'branch': (data.gitBranch === 'develop' ? 'master' : 'develop')}, website: website, setRefresher: setRefresher, lastPage: 'Website', lastPageOptions: {website: website}});
    }


    const handlePush = () => {
        navigation.navigate('CommandRunning', {commandName:'push', commandData: {'branch': data.gitBranch}, website: website, setRefresher: setRefresher, lastPage: 'Website', lastPageOptions: {website: website}});
    }

    const handleDeploy = (stage) => {
        navigation.navigate('CommandRunning', {commandName:'deploy', commandData: {'stage': stage, 'branch': data.gitBranch}, website: website, setRefresher: setRefresher, lastPage: 'Website', lastPageOptions: {website: website}});
    }

    const handleDeployDB = (stage) => {
        navigation.navigate('CommandRunning', {commandName:'deployDB', commandData: {'stage': stage}, website: website, setRefresher: setRefresher, lastPage: 'Website', lastPageOptions: {website: website}});
    }

    const handlePullDB = (stage) => {
        navigation.navigate('CommandRunning', {commandName:'pullDB', commandData: {'stage': stage}, website: website, setRefresher: setRefresher, lastPage: 'Website', lastPageOptions: {website: website}});
    }


    const handlePushUploads = (stage) => {
        navigation.navigate('CommandRunning', {commandName:'pushUploads', commandData: {'stage': stage}, website: website, setRefresher: setRefresher, lastPage: 'Website', lastPageOptions: {website: website}});
    }


    const handlePullUploads = (stage) => {
        navigation.navigate('CommandRunning', {commandName:'pullUploads', commandData: {'stage': stage}, website: website, setRefresher: setRefresher, lastPage: 'Website', lastPageOptions: {website: website}});
    }

    return (
        <div className={'body'}>
            <Header navigation={navigation} lastPage='Home' title={'Website: ' + website}/>
            <Container className={"content-container pt-3"}>
                {
                    (data !== false)
                        ? (
                            <>
                                <h3>Info:</h3>
                                <Table className={'websites-table mb-5'}>
                                    <tr className={'odd'}>
                                        <td>Is GIT?</td>
                                        <td>{data.isGit ? "True" : "False"}</td>
                                    </tr>
                                    <tr className={'even'}>
                                        <td>Is CAP?</td>
                                        <td>{data.isCap ? "True" : "False"}</td>
                                    </tr>
                                    <tr className={'odd'}>
                                        <td>Git Branch</td>
                                        <td>{data.gitBranch ?? "NA"}</td>
                                    </tr>
                                    <tr className={'event'}>
                                        <td>Git last Commit description</td>
                                        <td>{data.gitCommit ?? "NA"}</td>
                                    </tr>
                                    <tr className={'event'}>
                                        <td>Git last Commit date</td>
                                        <td>{data.gitCommitDate ?? "NA"}</td>
                                    </tr>
                                    <tr className={'event'}>
                                        <td>Git has changes?</td>
                                        <td>{data.gitHasChanges ? "Has changes" : "No changes"}</td>
                                    </tr>
                                </Table>

                                {data.isCap ? (
                                <>
                                    <h2 className={'mt-5'}>Deploy</h2>
                                    <p>Deploy development site</p>
                                    <Row>
                                        <Col md={3}>
                                            <Button onClick={() => handleDeploy('production')}>Deploy to Production</Button>
                                        </Col>
                                        <Col md={3}>
                                            <Button onClick={() => handleDeploy('staging')}>Deploy to Staging</Button>
                                        </Col>
                                    </Row>

                                    <h2 className={'mt-5'}>Deploy DB</h2>
                                    <p>Push just the DB to stage - good if only changed content not files</p>
                                    <Row>
                                        <Col md={3}>
                                            <Button onClick={() => handleDeployDB('production')}>Deploy DB to Production</Button>
                                        </Col>
                                        <Col md={3}>
                                            <Button onClick={() => handleDeployDB('staging')}>Deploy DB to Staging</Button>
                                        </Col>
                                    </Row>

                                    <h2 className={'mt-5'}>Pull DB</h2>
                                    <p>pull the DB to development site - updates site to current version</p>
                                    <Row>
                                        <Col md={3}>
                                            <Button onClick={() => handlePullDB('production')}>Pull from Production</Button>
                                        </Col>
                                        <Col md={3}>
                                            <Button onClick={() => handlePullDB('staging')}>Pull from Staging</Button>
                                        </Col>
                                    </Row>

                                    <h2 className={'mt-5'}>Push uploads</h2>
                                    <p>Push uploads folder</p>
                                    <Row>
                                        <Col md={3}>
                                            <Button onClick={() => handlePushUploads('production')}>Push to Production</Button>
                                        </Col>
                                        <Col md={3}>
                                            <Button onClick={() => handlePushUploads('staging')}>Push to Staging</Button>
                                        </Col>
                                    </Row>

                                    <h2 className={'mt-5'}>Pull uploads</h2>
                                    <p>Pull uploads folder</p>
                                    <Row>
                                        <Col md={3}>
                                            <Button onClick={() => handlePullUploads('production')}>Pull from Production</Button>
                                        </Col>
                                        <Col md={3}>
                                            <Button onClick={() => handlePullUploads('staging')}>Pull from Staging</Button>
                                        </Col>
                                    </Row>
                                </>
                                    ) : ""}

                                <h1 className={'mt-5 mb-5'}>Git Commands</h1>

                                <h2>Commit Changes</h2>
                                <p>Commit changes add their current version to the Git Repo, allowing for rolling them back in future</p>
                                <Row>
                                    <Col md={3}>
                                        <InputGroup>
                                            <input type={'text'} className={'form-control'} onChange={handleCommitMsgChange} value={commitMsg} placeholder={'Commit Msg'}/>
                                        </InputGroup>
                                    </Col>
                                    <Col md={3}>
                                        <Button onClick={handleCommitButtonClick}>Commit Changes</Button>
                                    </Col>
                                </Row>

                                { data.gitHasChanges ? "" : (
                                    <>
                                        <h2 className={'mt-5'}>Change Branch</h2>
                                        <p>Development branch is used to push to staging, master is used for pushing to live</p>
                                        <Row>
                                            <Col md={3}>
                                                <Button onClick={() => handleChangeBranch('master')}>Change to Master</Button>
                                            </Col>
                                            <Col md={3}>
                                                <Button onClick={() => handleChangeBranch('develop')}>Change to Develop</Button>
                                            </Col>
                                        </Row>
                                    </>
                                )}



                                { data.gitHasChanges ? "" : (
                                    <>
                                        <h2 className={'mt-5'}>Merge Branch {data.gitBranch === "develop" ? "master into develop" : "develop with master"}</h2>
                                        <p>Development branch is used to push to staging, master is used for pushing to live</p>
                                        <Row>
                                            <Col md={3}>
                                                <Button onClick={handleMerge}>Merge</Button>
                                            </Col>
                                        </Row>
                                    </>
                                )}

                                <h2 className={'mt-5'}>Push Commits</h2>
                                <p>Push any outstanding commits to the Git Server</p>
                                <Row>
                                    <Col md={3}>
                                        <InputGroup>
                                            <Button onClick={handlePush}>Push Commits</Button>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </>
                        )
                        : (<p>Loading...</p>)
                }
            </Container>
        </div>
    )
}
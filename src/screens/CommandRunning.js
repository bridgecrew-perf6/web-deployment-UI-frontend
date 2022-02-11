import Header from "../Partials/Header";
import {Button, Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {doCommand, getCommandOutput} from "../lib/api";

export default function CommandRunning({navigation, route}) {
    const [output, setOutput] = useState('');
    const [commandID, setCommandID] = useState(0);
    const [done, setDone] = useState(false);
    //const [outputInterval, setOutputInterval] = useState();
    let outputInterval;

    const handleBackClick = () => {
        navigation.navigate(route.params.lastPage, route.params.lastPageOptions);
        clearInterval(outputInterval);
        route.params.setRefresher((current) => ++current);
    }

    useEffect(() => {
        if(commandID) {
            outputInterval = setInterval(() => {
                getCommandOutput(commandID).then((data) => {
                    setOutput(data.output);
                    if (!data.running) {
                        clearInterval(outputInterval);
                        setOutput((data) => data.concat("\n DONE!"));
                        setDone(true);
                    }
                });
            }, 1000);
        } else {
            clearInterval(outputInterval);
        }
        return () => clearInterval(outputInterval);
    }, [commandID])

    useEffect(() => {
        setDone(false);
        doCommand(route.params.commandName, {data: route.params.commandData, dir: route.params.website}).then((data) => {
            console.log("data",data);
            setCommandID((data1) => data);
            console.log("data1", commandID);
        });
    }, [route.params.command]);

    return (
        <div className={'body'}>
            <Header navigation={navigation} lastPage={route.params.lastPage} title={'Running Command'} lastpageOpts={route.params.lastPageOptions}/>
            <Container className={"content-container pt-3"}>
                <p>Command: {route.params.command}</p>
                <pre style={{maxHeight: '80vh',overflow:'scroll'}}>
                    {output}
                </pre>
                {
                    done === true ? (<Button onClick={handleBackClick}>Back</Button>) : ""
                }
            </Container>
        </div>
    )
}
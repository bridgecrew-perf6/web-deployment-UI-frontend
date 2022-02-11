import {Button, Col, Container, Row} from "react-bootstrap";

export default function Header({navigation, lastPage, lastpageOpts={}, title}) {
    const handleBackClick = () => {
        navigation.navigate(lastPage, lastpageOpts);
    }

    return (
        <header className={'header'}>
            <Container>
                <Row>
                    <Col md={2}>
                        {typeof lastPage !== 'undefined' ? (
                            <Button onClick={handleBackClick}>Back</Button>
                        ) : ""}
                    </Col>
                    <Col md={10}>
                        <h1 className={'text-center'}>{title}</h1>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}
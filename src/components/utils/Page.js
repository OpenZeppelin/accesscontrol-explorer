import { Container, Card, Accordion } from 'react-bootstrap';

export default (props) => (
    <Container>
        {
            props.header &&
            <Card bg='light' className='my-3'>
                <Card.Header className='text-center'>
                    { props.header }
                </Card.Header>
            </Card>
        }
        {
            props.sections &&
            <Accordion className='my-3'>
                    {
                        props.sections.map(({ title, body }, i) =>
                            <Accordion.Item eventKey={i}>
                                <Accordion.Header>{ title }</Accordion.Header>
                                <Accordion.Body>{ body }</Accordion.Body>
                            </Accordion.Item>
                        )
                    }
            </Accordion>
        }
    </Container>
);
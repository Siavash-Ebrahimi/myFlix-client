import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';


export default class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    return (
      <Container style={{ marginTop: 50 }}>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>{director.Name}</Card.Title>
              <Card.Text >{director.Bio}</Card.Text>
              <Button type="button" variant="primary" onClick={() => { onBackClick() }}>Back</Button>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    );
  }

  // //Input Hook Section:
  // const [directorName, setDirectorName] = useState(props.Name);
  // const [directorDis, setDirectorDis] = useState(props.Description);
  // // const [password, setPassword] = useState('');  

}

DirectorView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};
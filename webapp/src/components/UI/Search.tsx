import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export function Search(props) {
  return (
    <>
        <InputGroup className="mb-3">
        <Form.Control
            placeholder={props.placeholder}
            aria-label={props.placeholder}
            aria-describedby="basic-addon2"
        />
        <Button variant="primary" id="button-addon2">
            Поиск
        </Button>
        </InputGroup>
    </>
    
  );
}

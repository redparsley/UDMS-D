import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export function Search() {
  return (
    <>
        <InputGroup className="mb-3">
        <Form.Control
            placeholder="Искать по содержанию документа"
            aria-label="Искать по содержанию документа"
            aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
            Search
        </Button>
        </InputGroup>
    </>
    
  );
}

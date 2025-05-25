import ListGroup from 'react-bootstrap/ListGroup';

const documents = [
    {
        name: "Служебная записка №123141",
        status: " Не подписан",
        id: 1
    },
     {
        name: "Служебная записка №1421241441",
        status: "Подписан",
        id: 2
    },
]

export function DocsList() {
    return (
        <ListGroup>
            <ul className="docs-list">
                {
                documents.map((doc) => {
                    return (    
                        <ListGroup.Item action key={doc.id} className='document'>
                            <p className="name">{doc.name}</p>
                            <p className="status">{doc.status}</p>
                            {/* <button className="check">Просмотреть документ</button> */}
                        </ListGroup.Item>
                    )
                })
            }
            </ul>
        </ListGroup>
    );
}
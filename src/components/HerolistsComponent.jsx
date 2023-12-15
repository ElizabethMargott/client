/* eslint-disable react/prop-types */
import { Container, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export function HerolistsComponent({ tasklists }) {
    const navigate = useNavigate();

    return (
        <Container className="hero mt-3">
            {tasklists.map((tasklist) => (
                <Card 
                    className="hero-card mb-3" 
                    key={tasklist.id} 
                    style={{ 
                        backgroundColor: "#1C1C1C", 
                        color: "#fff"
                    }} 
                    onClick={() => navigate(`/lists/${tasklist.id}`)}
                >
                    <Card.Body style={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center' 
                    }}>
                        <div style={{ flex: 1, maxWidth: '100%' }}>
                            <Card.Title className="truncate-text fade-out title-text">
                                {tasklist.title}
                            </Card.Title>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}

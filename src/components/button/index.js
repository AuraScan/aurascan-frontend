import { Button } from "react-bootstrap";
import './index.scss'

function HeightButton(props) {
    return <Button variant="outline-success btn_box">{props.data}</Button> 
}

export default HeightButton;
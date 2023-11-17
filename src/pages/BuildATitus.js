import {Col, Nav, Row} from "react-bootstrap";
import { readString } from "react-papaparse";
import { SizedBox } from "../components/SizedBox";
import { BrowserView, MobileView } from "react-device-detect";
import { useEffect, useState } from "react";
import mergeImages from 'merge-images';
import ImageTray from "../components/ImageImporter";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;
const Title = styled.h1`
font-size: 3.5em;
text-transform: uppercase;
font-family: 'GoodTiming', sans-serif; /* Fallback to sans-serif if custom font fails to load */
`

const MetallicButton = styled.button`
  background-color: #54C6B3; /* Base blue color */
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4)); /* Glossy effect */
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 20px; /* Rounded edges */
  cursor: pointer;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  text-transform: uppercase;
  font-weight: bold;
  font-family: 'GoodTiming', sans-serif; /* Fallback to sans-serif if custom font fails to load */
  transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Reset shadow on click */
  }
`;

export default function BuildATitus() {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [body, setBody] = useState("/titusparts/body.png");
    const [background, setBackground] = useState("/titusparts/bg/bg_AmenCorner.png");
    const [accessory, setAccessory] = useState("/titusparts/Accessory/7Iron.png");
    const [hat, setHat] = useState("/titusparts/Hat/BlackBallcap.png");
    const [shirt, setShirt] = useState("/titusparts/Shirt/GolfVest.png");
    const [pants, setPants] = useState("/titusparts/Pants/BlackPants.png");
    const [shoes, setShoes] = useState("/titusparts/Shoe/BlackShoes.png");
    const [image, setImage] = useState(null);
    const [partsTray, setPartsTray] = useState(null);
    const [b64, setB64] = useState(null);

    const changePartsTray = (dir) => {
        setPartsTray(<ImageTray dir={dir} onClick={(item) => {updateItem({item});}} bg={background}/>);
    }
    
    const updateItem = ({item}) => 
    {
        console.log("item: " + item)
        let itemSlot = "";
        let slot = item.split("/");
        itemSlot = slot[slot.length - 2];
        switch(itemSlot){
            case "bg":
                setBackground(item);
                break;

            case "accessory":
                setAccessory(item);
                break;

            case "hat":
                setHat(item);
                break;

            case "pants":
                setPants(item);
                break;
            
            case "shoe":
                setShoes(item);
                break;

            case "shirt":
                setShirt(item);
                break;


            default:
                console.log("Slot: " + slot);
                break;
                    
        }
    }

    const updateImage = async () => {
        let b64t = "";
        b64t = await mergeImages([background, body, hat, pants, shoes, shirt, accessory]);
        setB64(b64t);
        setImage(<img src={b64t} style={{width: "100%", display: "block"}} alt={"Titus"}/>);
    }



    useEffect(() => {
        updateImage();
    }, [background, body, pants, accessory, shoes, shirt, hat])

    useEffect(() => {
        updateImage();
    }, [])

        return(
                <>
                <BrowserView>
                    <div style={{width: "60%", margin:"auto", height: "auto", position:"absolute", top: "0px", left: "20%"}}>
                    <div style={{padding: "25px"}}>
                        <Col>
                            <Row>
                            <Container><Title>Titus Builder</Title></Container>
                            <Container><h3>Select traits to build a custom titus, then click on the image to save it!</h3></Container>
                                
                            </Row>
                            <Col>
                                </Col>
                                <SizedBox height={"25px"} />
                               
                            <Row>
                                <Col>
                                { image ? <h4></h4> : <></>}
                                <div style={{ padding: "5px", width: "60%", margin: "auto", backgroundColor:"rgba(255,255,255)"}}>
                                            
                                        <div style={{position: "relative"}}>
                                        <a href={b64} download="Titus.png">{image} </a>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                            </Row>
                            <SizedBox height={"25px"} />
                            <Row>
                            <Col>
                            <div style={{ padding: "5px", width: "80%", margin: "auto", zIndex: "-100"}}>
                                {image ? 
                                <Col>
                                    <Row>
                                    <Col>
    <MetallicButton style={{ width: '100%', cursor: 'pointer' }} onClick={() => {changePartsTray('bg');}}>
        Background
    </MetallicButton>
</Col>
<Col>
    <MetallicButton style={{ width: '100%', cursor: 'pointer' }} onClick={() => {changePartsTray('Hat');}}>
        Hat
    </MetallicButton>
</Col>
<Col>
    <MetallicButton style={{ width: '100%', cursor: 'pointer' }} onClick={() => {changePartsTray('Pants');}}>
        Pants
    </MetallicButton>
</Col>
<Col>
    <MetallicButton style={{ width: '100%', cursor: 'pointer' }} onClick={() => {changePartsTray('Shirt');}}>
        Shirt
    </MetallicButton>
</Col>
<Col>
    <MetallicButton style={{ width: '100%', cursor: 'pointer' }} onClick={() => {changePartsTray('Shoe');}}>
        Shoes
    </MetallicButton>
</Col>
<Col>
    <MetallicButton style={{ width: '100%', cursor: 'pointer' }} onClick={() => {changePartsTray('Accessory');}}>
        Accessories
    </MetallicButton>
</Col>
</Row>
                                    <SizedBox height={"25px"} />
                                    <Row>
                                        <Col>
                                            {partsTray}
                                        </Col>
                                    </Row>
                                </Col> 
                                : <p></p>}
                            </div>
                            </Col>
                            </Row>
                            <SizedBox height={"50px"} />
                            <SizedBox height={"75px"} />
                            <SizedBox height="25px" />
                        </Col>
                    </div>
                    </div>
                    </BrowserView>

                    <MobileView>
                    <div style={{width: "90%", margin:"auto", height: "auto", position:"absolute", top: "0px", left: "5%"}}>
                    <div style={{padding: "5px"}}>
                        <Col>
                            <Row>
                                <h1>TITUS BUILDER</h1>
                            </Row>
                            <Col>
                                </Col>
                                <SizedBox height={"25px"} />
                               
                            <Row>
                                <Col>
                                { image ? <h4></h4> : <></>}
                                <div style={{ padding: "5px", width: "30%", margin: "auto", backgroundColor:"rgba(255,255,255)"}}>
                                            
                                        <div style={{position: "relative"}}>
                                        <a href={b64} download="Titus.png">{image} </a>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                            </Row>
                            <SizedBox height={"25px"} />
                            <Row>
                            <Col>
                            <div style={{ padding: "5px", width: "100%", margin: "auto", zIndex: "-100"}}>
                                {image ? 
                                <Col>
                                <Row>
                                    <Col>
    <MetallicButton style={{ width: '100%', cursor: 'pointer' }} onClick={() => {changePartsTray('bg');}}>
        Background
    </MetallicButton>
</Col>
<Col>
    <MetallicButton style={{ width: '100%', cursor: 'pointer' }} onClick={() => {changePartsTray('Hat');}}>
        Hat
    </MetallicButton>
</Col>
<Col>
    <MetallicButton style={{ width: '100%', cursor: 'pointer' }} onClick={() => {changePartsTray('Pants');}}>
        Pants
    </MetallicButton>
</Col>
<Col>
    <MetallicButton style={{ width: '100%', cursor: 'pointer' }} onClick={() => {changePartsTray('Shirt');}}>
        Shirt
    </MetallicButton>
</Col>
<Col>
    <MetallicButton style={{ width: '100%', cursor: 'pointer' }} onClick={() => {changePartsTray('Shoe');}}>
        Shoes
    </MetallicButton>
</Col>
<Col>
    <MetallicButton style={{ width: '100%', cursor: 'pointer' }} onClick={() => {changePartsTray('Accessory');}}>
        Accessories
    </MetallicButton>
</Col>
</Row>
                                    <SizedBox height={"25px"} />
                                    <Row>
                                        <Col>
                                            {partsTray}
                                        </Col>
                                    </Row>
                                </Col> 
                                : <p></p>}
                            </div>
                            </Col>
                            </Row>
                            <SizedBox height={"50px"} />
                            <SizedBox height={"75px"} />
                            <SizedBox height="25px" />
                        </Col>
                    </div>
                    </div>
                    </MobileView>
            </>
        )
}

import { Col, Row } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";

const shadow = "/titusparts/shadow.png";

export default function ImageTray({dir, onClick, bg, type}) {

    function importAll(r) {
        let images = {};
         r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return r.keys();
       }
       let images = [];
       let imgtiles = [];


       //this is fucking stupid but for some reason images = importAll(require.context('../../public/titusparts/' + dir, false, /\.(png|jpe?g|svg)$/)) doesn't work so switch it is...
       switch(dir){
          case "bg":
            images = importAll(require.context('../../public/titusparts/bg', false, /\.(png|jpe?g|svg)$/));
            break;
          case "Hat":
            images = importAll(require.context('../../public/titusparts/Hat', false, /\.(png|jpe?g|svg)$/));
            break;
          case "Pants":
            images = importAll(require.context('../../public/titusparts/Pants', false, /\.(png|jpe?g|svg)$/));
            break;
          case "Shirt":
            images = importAll(require.context('../../public/titusparts/Shirt', false, /\.(png|jpe?g|svg)$/));
            break;
          case "Shoe":
            images = importAll(require.context('../../public/titusparts/Shoe', false, /\.(png|jpe?g|svg)$/));
            break;
          case "Accessory":
            images = importAll(require.context('../../public/titusparts/Accessory', false, /\.(png|jpe?g|svg)$/));
            break;

        }


        images.forEach(img =>{
            let src = img;
            let partName = img;
            if(img != bg){
                src = "/titusparts/" + dir + "/" + img.slice(2);
                let imgName = img.slice(2);
                const parts = imgName.split('_');
                if(parts[1]){
                  if (parts[1].includes('.png'))
                  {
                    parts[1] = parts[1].slice(0, -4);
                  }
                  partName = parts[1];
                } else 
                {
                  parts[0] = parts[0].slice(0, -4);
                  partName = parts[0];
                }
                
            }
            else
            {
                partName = bg.split('/')[4].slice(3, -4);
            }
            if(partName === "1none")
            {
                partName = "NONE"
            }

            const imgContainerStyle = {
                position: "relative"
              };
            

              const shadowStyle = {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
                zIndex: dir == "backgrounds" || dir == "nft parts/bg" ? 3 : 1
              };

              const textContainerStyle = {
                textAlign: "center"
              };

              const mainImageStyle = {
                position: "relative",
                zIndex: 1,
                cursor: "pointer",
                width: "100%"
              };
            
              imgtiles.push(
                <Col style={textContainerStyle}  onClick={() => onClick(src)} >
                  <div style={imgContainerStyle}>

                    <img src={src}  style={mainImageStyle}/>
                  </div>
                  <BrowserView>
                  <p>{partName}</p>
                  </BrowserView>
                  <MobileView>
                  <p style={{ fontSize: '8px' }}>{partName}</p>
                  </MobileView>

                </Col>
              );
        })


        let rows = [];
        let cols = [];

        for(let i = 0; i < imgtiles.length; i++)
        {
            cols.push(imgtiles[i]);

            if(cols.length == 5)
            {
                rows.push(
                    <Row>
                        {cols}
                    </Row>);
                cols = [];
            }

        }
        for(let j = cols.length; j < 5; j++)
        {
            cols.push(<Col></Col>);
        }
        rows.push(<Row>{cols}</Row>);


    return(
        <div>
        {rows}
        </div>
    )
}

import { useState } from "react"

export const Application = () => {
    const [img,setIMg]=useState("")
   const [loading,setLoading] = useState(false);
   const [qrData,setQrData] = useState("https://github.com/MohanDhanasekaran")
   const [qrSize,setQrSize] = useState("150")
   async function generateQR(){
        setLoading(true);
        try {
          const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
          setIMg(url);
        }catch(error) {
          console.log("Error generating QR Code ", error);
        }finally{
          setLoading(false)
        }
    }
    function downloadQR(){
      fetch(img).then((response)=>response.blob()).then((blob)=>{
        const link = document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
      }).catch((error)=>{
        console.log("Error downloading QR Code :" , error)
      })
    }
  return (
    <>
     <div className="app-container">
        <h1>QR CODE GENERATED</h1>
        {loading && <p>Please Wait ...</p>}
        {img &&  <img className="qr-code-image" src={img} alt=""/>
        }
        <div>
            <label htmlFor="dataInput" className="input-label">Data for QR Code :</label>
            <input type="text" value={qrData} id="dataInput" placeholder="Enter Data for QR Code" onChange={(e)=>setQrData(e.target.value)} />
            <label htmlFor="sizeInput" className="input-label">Image Size (e.g.,150) :</label>
            <input type="text" id="sizeInput" value={qrSize} placeholder="Enter Image Size" onChange={(e)=>setQrSize(e.target.value)}/>
             <button className="generate-button" disabled={loading} onClick={()=>generateQR()}>Generate QR Code</button>
             <button className="download-button" onClick={()=>downloadQR()}>Download QR Code</button>
        </div>
        <p className="footer">Designed By <a href="https://github.com/MohanDhanasekaran" target="_blank">Mohan Dhanasekaran</a></p>
     </div>
    </>
   
  )
} 

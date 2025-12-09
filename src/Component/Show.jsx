import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import '../CSS/Show.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Audio, Oval, ThreeDots } from 'react-loader-spinner'
import html2pdf from 'html2pdf.js';

function Show() {
    const { str } = useParams();
    const [data, setData] = useState([]);
    const [lang, setLang] = useState("Tamil");  
      const [loading, setLoading] = useState(false); 
    const contentRef = useRef();

    const get = async () => {
        setLoading(true);
        try {
            let res = await axios.get('https://hadith-archival-system-1.onrender.com/Hadith/get_details', {
                params: { str: str }
            });
            if (res.status === 200) {
                setData(res.data.data);
            }
        } catch (err) {
            toast.error("Data Error");
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        get();
    }, []);

    const downloadPDF = () => {
        const element = contentRef.current;
        element.classList.add("pdf-mode");

        const opt = {
            margin: [45, 20, 45, 20],
            filename: `${str}-${lang}.pdf`,  
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ["avoid-all", "css", "legacy"] }
        };

        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => element.classList.remove("pdf-mode"));
    };

    return (
        <>
         {loading ? (
                <div className="loader-overlay">
                    <Oval
                    height={80}
                    width={80}
                    color="#046f02ff"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                    />
                </div>
        ) : null}
            <Sidebar />
            <div className='div-show'>
                <select 
                    className='select-div'
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                >
                    <option value="Tamil">Tamil</option>
                    <option value="English">English</option>
                </select>

                <div className='div-content' ref={contentRef}>
                
                    {data.map((item, index) => (
                        <div key={index}>
                            <p className='show-para1'>
                                {lang === "Tamil" ? item.title : item.etitle}
                            </p>

                            <p className='show-content'>
                                {lang === "Tamil" ? item.tcontent : item.econtent}
                            </p>
                        </div>
                    ))}

                    <button className="download-btn" onClick={downloadPDF}>
                        Download PDF
                    </button>
                    
                </div>

            </div>
        </>
    );
}

export default Show;

import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import '../CSS/Show.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
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
            let res = await axios.get(
                "https://hadith-archival-system-1.onrender.com/Hadith/get_details",
                { params: { str: str } }
            );
            if (res.status === 200) {
                setData(res.data.data);
            }
        } catch (err) {
            toast.error("Data Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        get();
    }, []);

    const downloadPDF = async () => {
        const element = contentRef.current;

        element.classList.add("pdf-mode", "pdf-container", "pdf-border");

        const opt = {
            margin: 0,
            filename: `${str}-${lang}.pdf`,
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "pt", format: "a4", orientation: "portrait" }
        };

        await html2pdf().set(opt).from(element).save();

        element.classList.remove("pdf-mode", "pdf-container", "pdf-border");
    };

    return (
        <>
            {loading ? (
                <div className="loader-overlay">
                    <Oval height={80} width={80} color="#046f02" />
                </div>
            ) : null}

            <Sidebar />

            <div className="div-show">

                <select
                    className="select-div"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                >
                    <option value="Tamil">Tamil</option>
                    <option value="English">English</option>
                </select>

                <div className="div-content" ref={contentRef}>

                    {data.map((item, index) => (
                        <div key={index} className="page-break">
                            <p className="show-para1">
                                {lang === "Tamil" ? item.title : item.etitle}
                            </p>

                            <p className="show-content">
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

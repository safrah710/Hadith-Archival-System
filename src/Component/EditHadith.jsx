import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
import { Oval } from "react-loader-spinner";
import "../CSS/Add.css";

const EditHadith = () => {
  const [title, setTitle] = useState("");
  const [etitle, setEtitle] = useState("");
  const [tcontent, setTcontent] = useState("");
  const [econtent, setEcontent] = useState("");
  const [tlink, setTLink] = useState("");
  const [elink, setELink] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { str1, str2 } = useParams();

  const oldTitle = decodeURIComponent(str1);
  const oldEtitle = decodeURIComponent(str2);
  const fetchDetails = async () => {
    setLoading(true);
    try {
      let res = await axios.get("https://hadith-archival-system-1.onrender.com/hadith/get_details", {
        params: { str: oldEtitle },
      });

      if (res.status === 200 && res.data.data.length > 0) {
        const hadith = res.data.data[0];

        setTitle(hadith.title);
        setEtitle(hadith.etitle);
        setTcontent(hadith.tcontent);
        setEcontent(hadith.econtent);
        setTLink(hadith.tlink);
        setELink(hadith.elink);
      } else {
        toast.error("No Hadith Found!");
      }
    } catch (err) {
      toast.error("Fetch Error!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  const handle_submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await axios.post("https://hadith-archival-system-1.onrender.com/hadith/update", {
        oldTitle, 
        title,
        etitle,
        tcontent,
        econtent,
        tlink,
        elink,
      });

      if (res.status === 200) {
        toast.success("Hadith Updated Successfully");
        navigate("/Dashboard");
      }
    } catch (err) {
      toast.error("Update Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <Oval height={80} width={80} color="#087606ff" />
        </div>
      ) : null}

      <Sidebar />

      <div className="signup-wrapper1">
        <form className="signup-card1" onSubmit={handle_submit}>
          <h2 className="signup-heading">Update Hadith</h2>

          <input
            type="text"
            value={title}
            placeholder="TAM-TITLE"
            className="signup-field"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            value={etitle}
            placeholder="ENG-TITLE"
            className="signup-field"
            onChange={(e) => setEtitle(e.target.value)}
            required
          />

          <textarea
            value={tcontent}
            placeholder="TAMIL CONTENT"
            className="textarea-field"
            onChange={(e) => setTcontent(e.target.value)}
            required
          ></textarea>

          <textarea
            value={econtent}
            placeholder="ENGLISH CONTENT"
            className="textarea-field"
            onChange={(e) => setEcontent(e.target.value)}
            required
          ></textarea>

          <input
            type="text"
            value={tlink}
            placeholder="Tamil Link"
            className="signup-field"
            onChange={(e) => setTLink(e.target.value)}
            required
          />

          <input
            type="text"
            value={elink}
            placeholder="English Link"
            className="signup-field"
            onChange={(e) => setELink(e.target.value)}
            required
          />

          <button className="signup-green-btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditHadith;

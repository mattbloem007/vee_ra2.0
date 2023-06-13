import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';

<<<<<<< HEAD
const Calltoaction = () => {
    const calltoactionData = useStaticQuery (graphql`
        query calltoactionQuery {
            calltoactionJson(id: {eq: "calltoaction-1"}) {
                title
                buttonText
            }
        }
    `);
    const Title = calltoactionData.calltoactionJson.title;
    const ButtonText = calltoactionData.calltoactionJson.buttonText;
    return (
        <div className="rn-callto-action-area callto-action-style-1 bg-color-primary ptb--50">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="inner">
                            <h4 className="title">{Title}</h4>
                        </div> 
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 mt_sm--30">
                        <div className="action-btn text-left text-md-right">
                            <a className="rn-button btn-white" href="#calltoaction"><span>{ButtonText}</span></a>
=======
const Calltoaction = ({title, buttonText, action }) => {

    return (
        <div className="rn-callto-action-area callto-action-style-1 bg-color-primary ptb--50">
            <div className="container">
                <div className="align-items-center" style={{marginLeft: "0px"}}>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="inner">
                            <h4 className="title">{title}</h4>
                        </div>
                    </div>
                    <div className="col-lg-12" style={{paddingLeft: "0px"}}>
                        <div className="action-btn text-left text-md-left">
                            <button className="rn-button btn-white" style={{display: "flex", justifyContent: "center", padding: "0px 30px"}} onClick={action}><span style={{whiteSpace: "nowrap"}}>{buttonText}</span></button>
>>>>>>> 5ec1c145 (trying to upload)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calltoaction

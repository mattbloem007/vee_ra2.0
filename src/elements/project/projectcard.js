import React from 'react';
import {Link} from 'gatsby'
import Image from "../image";
<<<<<<< HEAD
import Img from 'gatsby-image'


const Projectcard = ({image, id, title, category, column}) => {
    let projectImg;
    if(image.fixed && typeof image.fixed !== 'function'){
        projectImg = <Img fixed={image.fixed} alt={title}/>;
    } else if(image.fluid){
        projectImg = <Image fluid={image.fluid} alt={title}/>
    } else{
        projectImg = <img src={image.src} alt={title}/>
    }
=======
import {GatsbyImage} from 'gatsby-plugin-image'


const Projectcard = ({image, id, title, category, column, name}) => {
    let projectImg;
    console.log("name", name)
    if(image.fixed && typeof image.fixed !== 'function'){
        projectImg = <GatsbyImage image={image.fixed} alt={title}/>;
    } else if(image.fluid){
        projectImg = <Image fluid={image.fluid} alt={title}/>
    } else if(image.fixed){
      console.log("image.gatsbyImageData", image.fixed)
        projectImg = <GatsbyImage image={image.fixed} alt={title}/>
        console.log(projectImg)
    } else{
        projectImg = <img src={image} alt={title}/>
    }

>>>>>>> 5ec1c145 (trying to upload)
    return (
        <div className={column}>
            <div className="portfolio">
                <div className="thumbnail">
<<<<<<< HEAD
                    <Link to={`/project/${id}`}>
=======
                    <Link to={`/project/${name}`}>
>>>>>>> 5ec1c145 (trying to upload)
                        {projectImg}
                    </Link>
                </div>
                <div className="content">
                    <div className="inner">
<<<<<<< HEAD
                        {title && <h4 className="title"><Link to={`/project/${id}`}>{title}</Link></h4>}
=======
                        {title && <h4 className="title"><Link to={`/project/${name}`}>{title}</Link></h4>}
>>>>>>> 5ec1c145 (trying to upload)
                        {category && <span className="category"><a href="#category">{category}</a></span>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Projectcard;

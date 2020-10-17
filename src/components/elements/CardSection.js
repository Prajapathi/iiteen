import React, { useEffect, useState } from "react";
import '../../styles/subjectSection.css'
import '../../styles/subjectCardSection.css'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SubjectCard from './Cards/SubjectCard'
import AITSCard from './Cards/AITSCard'
import PreviousYearCard from './Cards/PreviousYearCard'
import phy from '../../assets/data/11th'

export default function SubjectCardSection(props) {
    const [products, setProducts] = useState([]);
    const [productIndex, setProductIndex] = useState(0);
    const [disableLeft,setDisableLeft]=useState("gray");
    const [color,setColor]=useState("gray");
    const [vpWidth,setvpWidth]=useState(window.innerWidth);
    const [cardNumbers, setcardNumbers] = useState(0)

    let section;
    let initialItems;
    //if(props.section===null){
         initialItems=phy
    //}
    console.log(products,"pp")
    let firstFourProducts = products.slice(productIndex, productIndex + cardNumbers);
    const items = []
    for (let i=0;i<products.length/cardNumbers;i++) {
        items.push(i+1)
    }
    // useEffect(() => {
    //     setProducts(products.slice(productIndex, productIndex + cardNumbers))
    // }, [productIndex])
    useEffect(() => {
        if(props.section===null){
            setProducts(initialItems)
        }
        else
        setProducts([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]);
        window.addEventListener("resize", () => setvpWidth(window.innerWidth));
    },[])

    useEffect(() => {
        if(vpWidth>1250){
            setcardNumbers(5);
        }
        else if(vpWidth>1000){
            setcardNumbers(4);
        }
        else if(vpWidth>700){
            setcardNumbers(3);
        }
        else if(vpWidth>500){
            setcardNumbers(2);
        }
        else setcardNumbers(1);
        console.log(cardNumbers);
    },[vpWidth])

    useEffect(() => {
        if(props.search==null||props.search===""||!props.search.trim()){
            setProducts(initialItems)
            return;
        }
        setProducts(products.filter((data)=>{
            let s=props.search.trim();
            if(props.search===null||props.search==="")
                return data;
            else if(data.toLowerCase().startsWith(s.toLowerCase())){
                return data;
            }
        }))
        
    }, [props.search])


    const nextProduct = () => {
        console.log(vpWidth)
        setDisableLeft("black");
        const lastProductIndex = products.length - 1;
        const resetProductIndex = (productIndex+cardNumbers-1) >= lastProductIndex;
        const index = resetProductIndex ? 0 : productIndex + cardNumbers;
        setProductIndex(index);
    };
    
    const prevProduct = (e) => {
        if(productIndex===0){
            setDisableLeft("gray");
            return;
        }
        setDisableLeft("black");
        const index =  productIndex - cardNumbers;
        setProductIndex(index);
        if(index===0){
            setDisableLeft("gray")
        }
    };

    return (
        <div style={{}}>
            <div className="sub-cards">
                    {products.length===0
                        ?<div>No Results found</div>    
                        :firstFourProducts.map((product,index) => (
                            props.section=="AITS"
                                ?<AITSCard/>
                                :(props.section=="PreviousYear"
                                    ?<PreviousYearCard type={props.type} style={{transform: `translateX(${0}px)`,transition: 'transform ease-out 0.45s'}}/>
                                    :<SubjectCard number={index+1} name={products[index]}/>
                                )
                        ))
                    }
            </div>
            {products.length!==0&&products.length!==1?
                <div style={{display:'flex',margin:'20px 0'}}>
                    <ArrowLeftIcon type="button" style={{fontSize:'46px',margin:'0px 0 0px auto',color:disableLeft}} className="arrow" onClick={prevProduct}/>
                    <div style={{margin:'auto 0',display:'flex'}}>
                        {
                        cardNumbers!=1?items.map((number) =>
                            <div style={{margin:'4px',color:number==((productIndex+cardNumbers)/cardNumbers)?"#448698":"rgba(0,0,0,0.8)"}}>{number}</div>
                        ):null}
                    </div>
                    <ArrowRightIcon type="button"style={{fontSize:'46px',margin:'0 auto 0px 0'}} className="arrow" onClick={nextProduct}/>
                </div>
                :null
            }
        </div>
    )
}



const categoryproductStyle = {
    imageWrapper:{
        overflow: "hidden",
        display: "flex",
        justifyContent:"space-between",
    },
    prdimage:{
        padding:"8px",
        transitition: ".1s ease-in-out",
        cursor:"pointer",
        "&:hover":{
            transform:"scale(1.05)"
        }
    },
    categoryHeader:{
        
        textAlign: "center",
        color: "black",
        fontSize: "30px"
    },
    
    info:{
        fontSize: "20px",
        fontWeight: "$fw-medium",
        marginTop: "5px",
        lineHeight: "1.1em",
        textAlign:"center"
    },
    detailgrid:{
        justifyContent:"center",
        margin:"20px",
        padding:"20px"
    },
    paper:{
        margin:"15px"
    },
    btn:{
        border: "none",
        fontFamily: "inherit",
        fontSize: "inherit",
        color: "inherit",
        background: "none",
        cursor: "pointer",
        padding: "25px 80px",
        display: "inline-block",
        margin:" 15px 30px",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontWeight: "700",
        outline: "none",
        position: "relative",
        webkittransition: "all 0.3s",
        moztransition: "all 0.3s",
        transition: "all 0.3s",
     
}


};

export default categoryproductStyle;

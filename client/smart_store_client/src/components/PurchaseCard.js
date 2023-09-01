import '../css/PurchaseCard.css'
const PurchaseCard = ({listItem}) => {
    const currentDateToString = ( date ) => {
        let _date = date.getDate();
        let month = '';
        switch(date.getMonth()) {
            case 0: { month="Jan"; break;}  case 1: { month="Feb"; break;}  case 2: { month="Mar"; break;}
            case 3: { month="Apr"; break;}  case 4: { month="May"; break;}  case 5: { month="Jun"; break;}
            case 6: { month="Jul"; break;}  case 7: { month="Aug"; break;}  case 8: { month="Sep"; break;}
            case 9: { month="Oct"; break;}  case 10: { month="Nov"; break;}  case 11: { month="Dec"; break;}
        }

        let year = date.getFullYear()

        let time = Math.floor(date.getHours/12)===0? 'am' : 'pm';
        let hours = date.getHours()
        if(hours===24 || hours===0) {
            hours=12;
        } else if(hours===12){
            hours=12
        } else {
            hours=Math.floor(hours%12);
        }
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        return (`${_date} ${month} ${year},  ${hours}:${minutes}:${seconds} ${time}`)
    }
    
    // const purchaseItems = JSON.parse(listItem.purchaseItems);
    const purchaseDate = new Date(listItem.purchaseDateTime);

    return (
        <div className="purchase-card">
            <span className='id-div'>
            <h3 className="purchase-id"> Order ID: </h3> <span className='order-id'>{listItem.purchaseID}</span> 
            </span>
            <p className="purchase-orderby"> <b>Ordered by:</b> {listItem.purchaseName} </p>
            <p className="purchase-date"> <b>Ordered on:</b> {currentDateToString(purchaseDate)} </p>
            <p className="purchase-total"> <b>Total bill:</b> {listItem.purchaseTotal + " $"} </p>

            <div className="purchase-list">

                <div className="purchase-item heading">
                    <span className="purchase-index"> s.no. </span>                        
                    <span className="purchase-name" style={{flex: "5"}}> product </span>
                    <span className="purchase-qty"> qty </span>
                    <span className="purchase-price"> cost </span>
                </div>
                {
                    (listItem.purchaseItems && listItem.purchaseItems.length> 0)?listItem.purchaseItems.map((item, index) => {
                        return(
                            <div className="purchase-item" key={index+1}>
                                <span className="purchase-index"> {index+1} </span>                        
                                <span className="purchase-name" style={{flex: "5"}}> {item.productName} </span>
                                <span className="purchase-qty"> {item.userPurchaseQty} </span>
                                <span className="purchase-price"> {item.productTotalPrice} </span>
                            </div>
                        )
                    }):null
                }
            </div>
        </div>
    )
}

export default PurchaseCard


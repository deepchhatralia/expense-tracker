import "../css/list.css";

const List = ({ icon, text }) => {
    return (
        <>
            <div className="list container">
                <div className="content row">
                    <div className="col-md-1">
                        {icon}
                    </div>
                    <div className="col-md-11">
                        {text}
                    </div>
                </div>
            </div>
        </>
    );
};

export default List;
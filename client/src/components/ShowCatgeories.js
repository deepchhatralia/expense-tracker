import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';

const ShowCatgeories = ({ allCategories, loadCatForUpdate, deleteCat }) => {
    return (
        <>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">Sr No.</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {allCategories ? allCategories.map((val, index) => {
                        const { _id, categoryName } = val;

                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{categoryName}</td>
                                <td>
                                    <button onClick={() => loadCatForUpdate(_id)} className="tableBtns" title="update">
                                        {<UpdateIcon />}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => deleteCat(_id)} className="tableBtns" title="delete">
                                        {<DeleteIcon />}
                                    </button>
                                </td>
                            </tr>
                        );
                    }) : "No Categories"}
                </tbody>
            </table>
        </>
    );
};

export default ShowCatgeories;
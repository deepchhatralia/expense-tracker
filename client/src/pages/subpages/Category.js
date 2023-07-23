import { useEffect, useState } from "react";
import ShowCatgeories from "../../components/ShowCatgeories";
import { getCategory, getCategories, updateCategory, deleteCategory, addCategory } from "../../utils/fetchData";

const Category = () => {
    const [addOrUpdate, setAddOrUpdate] = useState(1);
    const [error, setError] = useState("");

    const [catId, setCatId] = useState("");
    const [categoryName, setCategoryName] = useState("");

    const [allCategories, setAllCategories] = useState([]);

    const checkValidation = () => {
        if (!categoryName) {
            setError("Enter category name");
            return 0;
        }
        setError("");
        return 1;
    }

    const generateCategories = async () => {
        const res = await getCategories();

        setAllCategories(res);
    };

    const loadCatForUpdate = async (id) => {
        let res = await getCategory(id);
        res = res.data[0];

        setCatId(res._id);
        setCategoryName(res.categoryName);
        setAddOrUpdate(0);
    };


    const addCat = async () => {
        if (!checkValidation()) {
            return;
        }
        let res = await addCategory({ categoryName });

        if (res.categoryExist) {
            setError("Already exist");
            return;
        }

        if (res.success) {
            res = res.data;

            setAllCategories(prev => [...prev, res]);
            setCategoryName("");
        }
    };

    const updateCat = async () => {
        if (!checkValidation()) {
            return;
        }
        let res = await updateCategory(catId, { categoryName: categoryName });
        res = res.data;

        setAllCategories(val => val.map(prev => prev._id != res._id ? prev : res));

        setAddOrUpdate(1);
        setCategoryName("");
        setCatId("");
    };

    const deleteCat = async (id) => {
        if (window.confirm("Are you sure to delete ??")) {
            let res = await deleteCategory(id);


            if (res.success) {
                // setAllCategories(prev => prev.map(val => val._id != res.data._id && val))
                generateCategories();
            }
        }
    };

    useEffect(() => {
        generateCategories();
    }, []);

    return (
        <>
            <div className="container">
                <div className='mb-5'>
                    <div className="mb-3 row">
                        <label htmlFor="amt" className="col-md-2 col-form-label">Category Name</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" id="amt"
                                value={categoryName}
                                onChange={e => setCategoryName(val => e.target.value)} />
                        </div>
                    </div>
                    <div className='mb-2' style={{ color: "red", fontSize: "13px", fontStyle: "italic" }}>
                        {error}
                    </div>
                    <div className="mb-3 row">
                        {/* <label htmlFor="note" className="col-sm-2 col-form-label">Note</label> */}
                        <div className="col-md-7">
                            <button onClick={() => {
                                addOrUpdate ? addCat() : updateCat()
                            }} className='btn btn-primary w-100'>
                                {addOrUpdate ? "Add" : "Update"}
                            </button>
                        </div>
                    </div>
                </div>

                <ShowCatgeories allCategories={allCategories} loadCatForUpdate={loadCatForUpdate} deleteCat={deleteCat} />
            </div >
        </>
    );
};

export default Category;
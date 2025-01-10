import { ModalBody, Modal, ModalHeader } from "react-bootstrap";
import Api from "../Api";
import { useEffect, useState } from "react";

const CategoryModalForm = ({category, HideModal}) => {
    const { http } = Api();
    const [value, setValue] = useState({
        sku:category.sku || "",
        cname: category.cname|| "",
        cdescription:category.cdescription|| "",
    });

    const [error, setError] = useState({
        sku: "",
        cname: "",
        cdescription: "",
    });

    // Handle form input changes
    const handleInput = (e) => {
        const { name, value } = e.target;
        setValue((prevValue) => ({ ...prevValue, [name]: value }));
    };

    // Save new category
    const save = async (e) => {
        e.preventDefault();
        try {
            const response = await http.post("category/store", value);
            if (response.data.status === 402) {
                setError({
                    sku: response.data.sku || "",
                    cname: response.data.cname || "",
                    cdescription: response.data.cdescription || "",
                });
            }
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };
    console.log(category)

    // Fetch category data for editing
  

    // Update category
    const update = async (e) => {
        e.preventDefault();
        try {
            await http.post(`category/update/${category.id}`, value);
             window.location.reload();
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    useEffect(() => {
        if (category > 0) {
        }
    }, [category]);

    return (
        <div className="container py-5">
            <div className="row shadow-sm bg-light col-md-6 offset-md-2">
                <Modal show={true} className="modal">
                    <ModalHeader>
                        <button className="btn btn-close" onClick={HideModal}></button>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={category.id > 0 ? update : save}>
                            <div className="row">
                                {/* SKU Field */}
                                <div className="form-group">
                                    <label htmlFor="sku">SKU</label>
                                    <input
                                        className={`form-control ${error.sku ? "is-invalid" : ""}`}
                                        name="sku"
                                        placeholder="Enter SKU"
                                        onChange={handleInput}
                                        value={value.sku}
                                    />
                                    {error.sku && <span className="text-danger">{error.sku}</span>}
                                </div>

                                {/* Name Field */}
                                <div className="form-group">
                                    <label htmlFor="cname">Name</label>
                                    <input
                                        className={`form-control ${error.cname ? "is-invalid" : ""}`}
                                        name="cname"
                                        placeholder="Enter category name"
                                        onChange={handleInput}
                                        value={value.cname}
                                    />
                                    {error.cname && <span className="text-danger">{error.cname}</span>}
                                </div>

                                {/* Description Field */}
                                <div className="form-group">
                                    <label htmlFor="cdescription">Description</label>
                                    <textarea
                                        className={`form-control ${error.cdescription ? "is-invalid" : ""}`}
                                        name="cdescription"
                                        placeholder="Enter category description"
                                        onChange={handleInput}
                                        value={value.cdescription}
                                    ></textarea>
                                    {error.cdescription && (
                                        <span className="text-danger">{error.cdescription}</span>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="form-group mt-2">
                                    <button className="btn btn-primary btn-sm">
                                        {category > 0 ? "Update" : "Save"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
};

export default CategoryModalForm;

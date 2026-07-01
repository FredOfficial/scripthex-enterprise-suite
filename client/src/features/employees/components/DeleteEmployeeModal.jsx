import { showError, showSuccess } from "../../../utils/toast";
import { deleteEmployee } from "../services/employeeService";

const DeleteEmployeeModal = ({ employee, onClose, onSuccess }) => {
  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.id);

      const employeeName =
        `${employee.firstName} ${employee.middleName || ""} ${employee.lastName}`.replace(
          /\s+/g,
          " ",
        );

      showSuccess(`Employee ${employeeName} was deleted successfully.`);

      await onSuccess();

      onClose();
    } catch (error) {
      showError(error.response?.data?.message || "Failed to delete employee.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <h2>Delete Employee</h2>

        <p>Are you sure you want to delete</p>

        <strong>
          {employee.firstName} {employee.middleName} {employee.lastName}?
        </strong>

        <p className="delete-warning">This action cannot be undone.</p>

        <div className="delete-modal-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;

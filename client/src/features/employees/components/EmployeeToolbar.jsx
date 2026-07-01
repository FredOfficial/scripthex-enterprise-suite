import { FiSearch } from "react-icons/fi";

const EmployeeToolbar = ({ search, setSearch }) => {
  return (
    <div className="employees-toolbar">
      <div className="search-box">
        <FiSearch />

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select>
        <option>All Departments</option>
      </select>

      <select>
        <option>All Status</option>
      </select>
    </div>
  );
};

export default EmployeeToolbar;

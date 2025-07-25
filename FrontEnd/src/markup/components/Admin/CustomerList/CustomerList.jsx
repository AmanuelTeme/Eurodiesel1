import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import {
  HiChevronDoubleRight,
  HiMiniChevronDoubleLeft,
  HiChevronRight,
  HiChevronLeft,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useAuth } from "../../../../Context/AuthContext";
import customerService from "../../../../services/customer.service";

const CustomerList = () => {
  const { t } = useTranslation();
  const [offset, setOffset] = useState(0);
  const [last, setLast] = useState("");
  const [search, setSearch] = useState([]);
  const [val, setValue] = useState("");
  const [customers, setCustomers] = useState([]);

  const { employee } = useAuth();
  const token = employee?.employee_token;

  const handleSearchCustomer = async () => {
    try {
      const data = await customerService.searchedCustomers(val, token);
      setSearch(data);
    } catch (error) {
      console.log(error);
    }
  };

  const customersData = async () => {
    try {
      const { data } = await customerService.getAllCustomers(token, offset);
      const l = await customerService.totalNofCustomers(token);
      setLast(l);
      setCustomers(data.customers);
    } catch (error) {
      console.log(error);
    }
  };

  const First = () => {
    setOffset(0);
  };

  const Next = () => {
    setOffset((prev) => prev + 10);
  };

  const Previous = () => {
    if (offset < 10) {
      setOffset(0);
    } else {
      setOffset((prev) => prev - 10);
    }
  };

  const Last = () => {
    let res = last % 10;
    if (res === 0) {
      setOffset(last - 10);
    } else {
      setOffset(last - res);
    }
  };

  useEffect(() => {
    if (val) {
      handleSearchCustomer();
    }
  }, [offset, val]);

  useEffect(() => {
    customersData();
  }, [employee]);

  return (
    <div>
      <div className="auto-container customer_list">
        <div className="contact-section pad_1">
          <div className="contact-title mb-1">
            <h2>{t("Customers")}</h2>
          </div>
        </div>

        <div className="search_customer ">
          <input
            type="text"
            className="w-100  form-control p-4"
            placeholder={t(
              "Search for a customers using first name , last name, email address or phone number"
            )}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          {/* <div className="search_btn">
            <CiSearch size={20} />
          </div> */}
        </div>

        <div className="table-responsive rounded-3 ">
          <table className="table table-striped table-bordered table-hover border ">
            <thead className="table-dark ">
              <tr>
                <th scope="col" className="border">
                  {t("ID")}
                </th>
                <th>{t("First Name")}</th>
                <th>{t("Last Name")}</th>
                <th>{t("Email")}</th>
                <th>{t("Phone")}</th>
                <th>{t("Added Date")}</th>
                <th>{t("Active")}</th>
                <th>{t("Edit")}</th>
              </tr>
            </thead>
            <tbody>
              {(val ? search : customers).length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    {t("No customers found")}
                  </td>
                </tr>
              ) : (
                (val ? search : customers).map((customer) =>
                  customer && customer.customer_id ? (
                    <tr key={customer.customer_id}>
                      <td>{customer.customer_id}</td>
                      <td className="customer_name">
                        {customer.customer_first_name}
                      </td>
                      <td className="customer_name">
                        {customer.customer_last_name}
                      </td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone_number}</td>
                      <td>
                        {customerService.formatDate(
                          customer.customer_added_date
                        )}
                      </td>
                      <td>
                        {customer.active_customer_status ? t("Yes") : t("No")}
                      </td>
                      <td>
                        <Link
                          to={`/admin/edit-customer/${customer.customer_id}`}
                          className="editButton"
                        >
                          <FaEdit className="px-1 svg" size={28} />
                        </Link>
                        <Link
                          to={`/admin/customers/${customer.customer_id}`}
                          className="editButton"
                        >
                          <FiExternalLink className="px-1" size={28} />
                        </Link>
                      </td>
                    </tr>
                  ) : null
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="text-center btns">
          <button onClick={First}>
            <HiMiniChevronDoubleLeft /> <span>{t("First")}</span>
          </button>
          <button onClick={Previous}>
            <HiChevronLeft />
            <span>{t("Previous")}</span>
          </button>
          <button onClick={Next}>
            <HiChevronRight /> <span> {t("Next")}</span>
          </button>
          <button onClick={Last}>
            <span>{t("Last")}</span> <HiChevronDoubleRight />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;

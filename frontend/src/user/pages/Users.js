import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  faBed,
  faCake,
  faCoffee,
  faHeart,
  faHeartCircleBolt,
  faMugHot,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Users.css";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <div className="users-container">
        <div className="users-content">
          <div className="user-icon">
            <FontAwesomeIcon icon={faMugHot} />
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <span className="title">WELCOME TO COMMUNITY OF COFFEE LOVERS</span>
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Users;

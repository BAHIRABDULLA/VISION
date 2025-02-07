export const ERROR_MESSAGES = {
    USER_ALREADY_EXISTS: 'User already existed',
    USERS_NOT_FOUND: "Users not found.",
    USER_NOT_FOUND: "User not found.",
    ERROR_UPDATING_STATUS: "There is an issue updating the status. Please try again.",
    ERROR_RETRIEVING_USER_DETAILS: "Error retrieving User details.",
    ACCESS_DENIED: "You do not have permission to access this resource.",
    INVALID_CREADENTIALS: 'Invalid credentials , please try again',
    INTERNAL_SERVER_ERROR: "Internal server error.",
    
    CATEGORY_ALREADY_EXISTS: 'Category already existed',
    CATEGORY_NOT_FOUND: "Category not found.",
    ERROR_CREATING_CATEGORY: "Unexpected error occuring to creating Category.",
    
};


export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logout successful",

    USER_CREATED: "User successfully created",
    USER_UPDATED: "User successfully updated",
    USER_DELETED: "User successfully deleted",
    DASHBOARD_DETAILS_FETCHED: "Dashboard details retrieved successfully.",
    USER_DETAILS_FETCHED: "User details retrieved successfully.",
    ALL_USERS_FETCHED: "All Users retrieved successfully.",
    USER_PURCHASED: "User successfully purchased",

    CATEGORY_CREATED: "Category successfully created",
    CATEGORY_UPDATED: "Category successfully updated",
    CATEGORY_DELETED: "Category successfully deleted",
    CATEGORY_DETAILS_FETCHED: "Category details retrieved successfully.",
    ALL_CATEGORYS_FETCHED: "All Categorys retrieved successfully.",

    STATUS_UPDATED: "Status updated successfully.",

    MENTOR_APPROVED: "Mentor approved successfully.",
};


export const RABBITMQ_QUEUE = {
    // CATEGORY_EXCHANGE: 'category_exchange',
}

export const RABBITMQ_EXCHANGE = {
    CATEGORY_EXCHANGE: 'category_exchange',
}
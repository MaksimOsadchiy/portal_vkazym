const chech = () => {
    if (!SESSION?.id) {
        window.location.href = BASE_URL;
    };
};


chech();
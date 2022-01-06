"use strict";


/**
 * A module that maintains 2 classes.
 * Task class and image class.
 * @type {{}}
 */
let marsImagesBrowser = (() => {
    let classes = {}

    classes.Mission = class {
        constructor(name, landingEarthDate, maxEarthDate, maxSolDate, cameras) {
            this.name = name;
            this.landingEarthDate = landingEarthDate;
            this.maxEarthDate = maxEarthDate;
            this.maxSolDate = maxSolDate;
            this.cameras = cameras;
        }
    }
    classes.Image = class {
        constructor(source, id, earthDate, sol, camera, mission) {
            this.source = source;
            this.id = id;
            this.earthDate = earthDate;
            this.sol = sol;
            this.camera = camera;
            this.mission = mission;

        }
    }
    return classes;
})();

/**
 * Input validation module.
 */
const validatorModule = (function() {
    //global const error message
    const MSG_NOT_DATE = 'Text must contain earth date (YYYY-MM-DD) or SOL number';
    const MSG_EMPTY_INPUT = 'Input is required here';

    /**
     * Checks that the input is not empty.
     * @param str - The string to validate
     * @returns {{isValid: boolean, message: string}} - a boolean and message in case validate failed
     */
    const isNotEmpty = function(str) {
        return {
            isValid: (str.length !== 0),
            message: MSG_EMPTY_INPUT
        };
    }

    /**
     * Checks that this is str format of sol date
     * @param str -  The string to validate
     * @returns {{isValid: *, message: string}} -  a boolean and message in case validate failed
     */
    const isSol = function(str) {
        return {
            isValid: (str.match(/^(\d{1,4})$/)),
            message: MSG_NOT_DATE
        };
    }

    /**
     * Check that the input is indeed in the format of the Earth date,
     * which does not exceed the days / dates / years of a valid date.
     * @param str - The string to validate
     * @returns {{isValid: boolean, message: string}} -  a boolean and message in case validate failed
     */
    const isDate = function(str) {
        let currVal = str;
        let rxDatePattern = /^(\d{4})([\-])(\d{1,2})([\/-])(\d{1,2})$/; //Declare Regex
        let dtArray = currVal.match(rxDatePattern); // is format OK?

        if (dtArray == null)
            return {
                isValid: false,
                message: MSG_NOT_DATE
            }

        //Checks for mm/dd/yyyy format.
        let dtMonth = dtArray[3];
        let dtDay = dtArray[5];
        let dtYear = dtArray[1];

        if (dtMonth < 1 || dtMonth > 12)
            return {
                isValid: false,
                message: MSG_NOT_DATE
            }
        else if (dtDay < 1 || dtDay > 31)
            return {
                isValid: false,
                message: MSG_NOT_DATE
            }
        else if ((dtMonth === 4 || dtMonth === 6 || dtMonth === 9 || dtMonth === 11) && dtDay === 31)
            return {
                isValid: false,
                message: MSG_NOT_DATE
            }
        else if (dtMonth === 2) {
            let isleap = (dtYear % 4 === 0 && (dtYear % 100 !== 0 || dtYear % 400 === 0));
            if (dtDay > 29 || (dtDay === 29 && !isleap))
                return {
                    isValid: false,
                    message: MSG_NOT_DATE
                }
        }
        return {
            isValid: true,
            message: MSG_NOT_DATE
        };
    }

    return {
        isNotEmpty: isNotEmpty,
        isSol: isSol,
        isDate: isDate
    }

})();

/**
 * A module that produces HTML according to the request.
 * @type {{}}
 */
let makerHTML = (() => {
    let publicData = {}

    /**
     * Turn the information of the image into a tab on a web page that contains all the details of the image.
     * @param sourceImage - The image url
     * @param id - The id image.
     * @param earthDate - Earth date of the image.
     * @param sol - Sol date of the image.
     * @param camera - The name of the camera that took the picture.
     * @param mission - The name of the mission.
     * @returns {string} - html string insert to html page.
     */
    publicData.makeImageCard = function(sourceImage, id, earthDate, sol, camera, mission) {
        return (`
                <div class="col m-3"">
                    <div class="card image-div" style="width:19rem;"> 
                        <img class=" card-img-top"  src="${sourceImage}" alt="Card image cap"> 
                             <div class="card-body"> 
                                    <p id="imageID">ID: ${id} </p>
                                    <p id="imageEarthDate">Earth Date: ${earthDate} </p>
                                    <p id="imageSol">Sol Date: ${sol} </p>
                                    <p id="imageMission">Mission: ${mission} </p>
                                    <p id="imageCamera">Camera: ${camera}</p>
                            <div class="text-center">                         
                                <button type="button" class="btn btn-primary saveBtn"  style="width: 7rem; ">Save</button> 
                                <a type="button" href=${sourceImage} target="_blank" class="btn btn-primary fullSizeBtn"  style="width: 7rem; ">Full Size</a>                  
                            </div>
                        </div>
                    </div>
                </div>`);
    }

    /**
     * Creates HTML for an image that is in the saved list.
     * @param image - Image object that contain the date image.
     * @returns {string} - HTML to add to our page.
     */
    publicData.makeToSavedListImageHTML = function(image) {
        return `<li class="m-1"> 
                    <button type="button" class="btn btn-sm btn-outline-danger deleteBtn">X</button>
                    <a href="${image.url}" target="_blank">image id: ${image.imageId} </a>
                    </br>Earth date: ${image.date}, Sol: ${image.sol},
                    Camera: ${image.camera}, Mission: ${image.mission}
                </li>`;
    }

    /**
     * Creates HTML for an image that is in our image carousel on the page.
     * @param image - Image object that contain the data image.
     * @param active - string that contain "active" if this is the first image on carousel and add "active" to class image,
     *                 and if this is not the first image, we add empty string "" to class.
     *@returns {string} - HTML carousel image to add to our page.
     */
    publicData.makeImageCarouselHTML = function(image, active) {
        return `<div class="carousel-item ${active}" >
                    <img src="${image.url}" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${image.camera}</h5>
                        <p>${image.date}</p>
                        <a type="button" href=${image.url} target="_blank"
                            class="btn btn-primary fullSizeBtn"  style="width: 7rem; ">Full Size
                        </a>                  
                    </div>
                </div>`;
    }

    /**
     * Adding a tab with task / camera information to our HTML page
     * @param target - The position on the page to which we want to add.
     * @param data - The string you want to addץ
     */
    publicData.makeSelectOptionHtml = function(target, data) {
        document.getElementById(target).innerHTML += `<option>${data}</option>`;
    }

    return publicData;
})();


//main function
(function() {
    //our api key const
    const APIKEY = "cwVR0uFhLjChpfFNgSaVgpb7rPACcWaJggN55xma"

    //The lists we use during the program
    let imagesList = [];
    let imagesSavedIdList = [];
    let missionsList = [];

    //Elements that we define at the beginning of the program so as
    //not to repeatedly search for the element during the program and waste search resources.
    let dateInput = null;
    let missionInput = null;
    let cameraInput = null;
    let photoGalleryElem = null;
    let savedImagesListElem = null;
    let carouselElem = null;
    let noImagesFoundElem = null;
    let loadingBuffer = null;

    //const str of errors during program.
    const MSG_FAILED_LOAD_DATA = '"We were unable to load the information, please refresh the page and try again."';
    const MSG_IMAGE_EXIST = 'Image already saved';
    const MSG_DATE_BIGGER_EARTH_DATE = `The mission you've selected requires a date after: `;
    const MSG_DATE_SMALLER_EARTH_DATE = `The mission you've selected requires a date before:`;
    const MSG_DATE_BIGGER_SOL_DATE = `The mission you've selected requires a date before:`;
    const MSG_DATE_SMALLER_SOL_DATE = `The mission you've selected requires a date before:`;
    const MSG_SYNC_MISSION_FAILED = "The mission dont sync with the camera";
    const MSG_SYNC_CAMERA_FAILED = "The Camera dont sync with the mission";
    const MSG_FAILED_LOAD_IMAGES_GALLERY = `We were unable to load the information. 
    please check the Internet connection.`;

    //check if the api connection is ok or failed
    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    // returns a promise!
    function json(response) {
        return response.json();
    }

    /**
     * The function connects to NASA's API and requests the information about the missions (ID, Earth Date,
     * Sol Date, Cameras) within We call the function that will store the information in the lists we have.
     */
    function getDataOfMissions() {
        loadingBuffer.classList.remove("d-none");
        fetch('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=' + APIKEY)
            .then(status)
            .then(json)
            .then(function(data) {

                let camerasList = [];

                //save the missions' data on list.
                for (const mission of data.rovers) {
                    missionsList.push(new marsImagesBrowser.Mission(mission.name, mission.landing_date,
                        mission.max_date, mission.max_sol, mission.cameras));

                    makerHTML.makeSelectOptionHtml("missionInput", mission.name);

                    //save the cameras of all imssions
                    for (const j of mission.cameras) {
                        camerasList.push(j.name);
                    }
                }
                //remove the duplicates from the list
                let temp = new Set(camerasList);

                //insert the list to out html page
                for (const i of temp) {
                    makerHTML.makeSelectOptionHtml("cameraInput", i);
                }

                loadingBuffer.classList.add("d-none");

            }).catch(function(error) {
                //Here we will catch the failure of the connection and handle
                // it properly, print an error message to the user and ask to refresh the page.
                loadingBuffer.classList.add("d-none");
                console.log('Request failed', error);
                viewErrorModal(MSG_FAILED_LOAD_DATA);
            });
    }


    /**
     * Contact NASA's API and request the images available with the user's date, camera and task.
     * @param date - Date the user entered (Earth date or sol)
     * @param mission - Mission name the user entered.
     * @param camera - Camera name the user entered.
     */
    function getDataImageGallery(date, mission, camera) {
        document.querySelector("#loadingBuffering").classList.remove("d-none");
        date = date.match('-') ? 'earth_date=' + date : 'sol=' + date;
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${mission}/photos?${date}&camera=${camera}&api_key=${APIKEY}`)
            .then(status)
            .then(json)
            .then(function(data) {

                noImagesFoundElem.classList.add("d-none");
                loadingBuffer.classList.add("d-none");

                //If no images are found, we will notify the user on the web page.
                if (data.photos.length === 0) {
                    noImagesFoundElem.classList.remove("d-none");
                    return;
                }
                //We will save the images that came to us from DATA within a list, and each image is represented by an image object.
                for (const photo of data.photos) {
                    let tempDivImage = makerHTML.makeImageCard(photo.img_src, photo.id, photo.earth_date, photo.sol,
                        photo.camera.name, photo.rover.name);

                    photoGalleryElem.innerHTML += tempDivImage;

                    imagesList.push(new marsImagesBrowser.Image(photo.img_src, photo.id, photo.earth_date, photo.sol,
                        photo.camera.name, photo.rover.name));
                }

                //add listeners to save buttons
                for (const b of document.getElementsByClassName("saveBtn")) {
                    b.addEventListener('click', addToSaveList);
                }

            }).catch(function(error) {
                //Here we will catch the failure of the connection and handle
                // it properly, print an error message to the user and ask to refresh the page.
                loadingBuffer.classList.add("d-none");
                console.log('Request failed', error);
                viewErrorModal(MSG_FAILED_LOAD_IMAGES_GALLERY);
            });
    }

    /**
     * Handles 'SAVE' clicks on any image card.
     * Saves the image information in a neat list that is displayed to the user.
     * Puts the image into an HTML page in a carousel of images, thus allowing the user to open a carousel of his saved list.
     */
    function addToSaveList() {
        let savedButtons = document.getElementsByClassName('saveBtn');
        let myIndex = Array.from(savedButtons).indexOf(this);

        //add fetch not exist image saved
        if (!imagesSavedIdList.find(numId => numId === imagesList[myIndex].id)) {

            fetch("/api/resources/add-image", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "image": imagesList[myIndex] })
            }).then(function(response) {
                return response.json();
            }).then(function(data) {

                if (data)
                    getListOfSavedImages();

            }).catch(function(error) {
                viewErrorModal(error);
                console.log(error);
            });


        } else
            viewErrorModal(MSG_IMAGE_EXIST);
    }

    function deleteFromSaveList() {

        const imageId = this.nextElementSibling.textContent.replace(/\D/g, "");

        fetch("/api/resources/delete-image", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "imageId": imageId })
        }).then(function(response) {
            return response.json();
        }).then(function(data) {

            if (data)
                getListOfSavedImages();

        }).catch(function(error) {
            viewErrorModal(error);
            console.log(error);
        });
    }

    /**
     * Present using the message model you receive.
     * @param text - the string we want to view on the modal.
     */
    function viewErrorModal(text) {
        let modal = new bootstrap.Modal(document.getElementById("errorModal"));
        document.getElementById("errorModalText").innerHTML = text;
        modal.show();
    }

    /**
     * Validation check of the input, if there is an error we will present it in the petition where necessary.
     * @param inputElement - Position the input in the HTML code to pull the hollow and if
     *                      necessary display an appropriate error message.
     * @param validateFunc - A function by which we will perform the test appropriate to the user's input.
     * @returns {boolean|*} - Boolean that shows whether the input is correct or not.
     */
    const validateInput = (inputElement, validateFunc) => {
        let errorElement = inputElement.nextElementSibling; // the error message div
        let v = validateFunc(inputElement.value); // call the validation function
        errorElement.innerHTML = v.isValid ? '' : v.message; // display the error message
        v.isValid ? inputElement.classList.remove("is-invalid") : inputElement.classList.add("is-invalid");
        return v.isValid;
    }

    /**
     * If there is an error in a specific input, we will present a message corresponding to the error that occurred.
     * @param inputElement - The element of the input in which the error occurred.
     * @param message - An error message that we want to display to the user below the input box.
     */
    function setErrorInputMsg(inputElement, message) {
        let errorElement = inputElement.nextElementSibling; // the error message div
        errorElement.innerHTML = message; // display the error message
        inputElement.classList.add("is-invalid");
    }

    /**
     * Reset all error messages on the page.
     */
    const resetErrors = function() {
        document.querySelectorAll(".is-invalid").forEach((e) => e.classList.remove("is-invalid"));
        document.querySelectorAll(".errormessage").forEach((e) => e.innerHTML = "");
    }

    /**
     * Check if the date is in sync with the time the photo was taken.
     * @param missionInput - The name of the mission entered by the user.
     * @param dateInput - the date of the user entered.
     * @returns {boolean} -A boolean that says whether the date and the task are indeed synchronized.
     */
    function isTheDateMissionSync(missionInput, dateInput) {
        let mission = missionsList.find(element => element.name === missionInput.value);

        if (dateInput.value.match('-')) {
            if (mission.landingEarthDate.localeCompare(dateInput.value) === 1) {
                setErrorInputMsg(dateInput, MSG_DATE_BIGGER_EARTH_DATE + mission.landingEarthDate);
                return false;
            } else if (mission.maxEarthDate.localeCompare(dateInput.value) === -1) {
                setErrorInputMsg(dateInput, MSG_DATE_SMALLER_EARTH_DATE + mission.maxEarthDate);
                return false;
            }
        } else {
            if (dateInput.value < 0) {
                setErrorInputMsg(dateInput, MSG_DATE_BIGGER_SOL_DATE + mission.maxSolDate);
                return false;
            } else if (dateInput.value > mission.maxSolDate) {
                setErrorInputMsg(dateInput, MSG_DATE_SMALLER_SOL_DATE + mission.maxSolDate);
                return false;
            }
        }
        return true;
    }

    /**
     * Check if the required camera has the required task.
     * @param mission - the mission object.
     * @param camera - the camera name.
     * @returns {boolean} - Boolean that shows if the camera has the above task.
     */
    function isTheCameraMissionSync(mission, camera) {
        for (const i of missionsList) {
            if (mission.value === i.name) {
                for (const j of i.cameras) {
                    if (camera.value === j.name) {
                        return true;
                    }
                }
            }
        }
        //Displays the corresponding error message.
        setErrorInputMsg(mission, MSG_SYNC_MISSION_FAILED);
        setErrorInputMsg(camera, MSG_SYNC_CAMERA_FAILED);
        return false;
    }

    /**
     * Grabs the SUBMIT button located in FORM. And calls for a search of the images if the validation of our input is OK.
     * @param e - The "submit" form event.
     */
    function searchImages(e) {
        e.preventDefault();

        resetErrors();
        if (validateAllInput()) {
            imagesList = [];
            getDataImageGallery(dateInput.value, missionInput.value, cameraInput.value);
        }
    }

    /**
     * Manages the call validation of the input
     * @returns {*|boolean|boolean} - Boolean that shows whether the input is correct or not.
     */
    function validateAllInput() {

        photoGalleryElem.innerHTML = "";

        dateInput.value = dateInput.value.trim();
        missionInput.value = missionInput.value.trim();
        cameraInput.value = cameraInput.value.trim();


        let v1 = validateInput(dateInput, validatorModule.isNotEmpty);
        let v2 = validateInput(missionInput, validatorModule.isNotEmpty);
        let v3 = validateInput(cameraInput, validatorModule.isNotEmpty);

        let v5 = (v1) ? (dateInput.value.match('-')) ? validateInput(dateInput, validatorModule.isDate) :
            validateInput(dateInput, validatorModule.isSol) : false;

        let v4 = (v2 && v3) ? isTheCameraMissionSync(missionInput, cameraInput) : false;
        let v6 = (v1 && v2 && v5) ? isTheDateMissionSync(missionInput, dateInput) : false;

        return (v1 && v2 && v3 && v4 && v5 && v6);
    }

    /**
     * Resets the page data: Input lines, error messages, a list that holds the images displayed in the main gallery,
     * and the gallery itself.
     */
    function clearDataPage() {
        resetErrors();
        imagesList = []
        noImagesFoundElem.classList.add("d-none");
        photoGalleryElem.innerHTML = "";
        dateInput.value = "";
        missionInput.value = "";
        cameraInput.value = "";
    }

    /**
     * Initializes the variables we use frequently, so as not to call every time for a search of the appropriate element.
     */
    function setGlobalVariables() {
        dateInput = document.getElementById("dateInput");
        missionInput = document.getElementById("missionInput");
        cameraInput = document.getElementById("cameraInput");
        photoGalleryElem = document.getElementById("photosGallery");
        savedImagesListElem = document.getElementById("savedList");
        carouselElem = document.getElementById("imagesCarousel");
        noImagesFoundElem = document.getElementById("noImagesFound");
        loadingBuffer = document.querySelector("#loadingBuffering");
    }

    function getListOfSavedImages() {

        fetch("/api/resources/saved-image-list", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then(function(response) {
            return response.json();
        }).then(function(data) {

            setListOfSavedImages(data);
            return data;

        }).catch(function(error) {
            viewErrorModal(error);
            console.log(error);
        });
    }

    function setListOfSavedImages(savedList) {

        savedImagesListElem.innerHTML = "";
        let active = "active";

        savedList.forEach((image) => {
            savedImagesListElem.innerHTML += makerHTML.makeToSavedListImageHTML(image);
            document.getElementById("myCarousel").innerHTML += makerHTML.makeImageCarouselHTML(image, active);
            active = "";
        })

        //add listeners to save buttons
        for (const b of document.getElementsByClassName("deleteBtn")) {
            b.addEventListener('click', deleteFromSaveList);
        }

    }

    document.addEventListener('DOMContentLoaded', function() {

        setGlobalVariables()
        getDataOfMissions();
        getListOfSavedImages();

        document.getElementById("form-nasa-api").addEventListener("submit", searchImages);
        document.getElementById("slideShowBtn").addEventListener("click", () => {
            (imagesSavedIdList.length > 0) ? carouselElem.classList.remove("d-none"):
                viewErrorModal("No saved photos..");
        });
        document.getElementById("stopSlideShowBtn").addEventListener("click", () => {
            carouselElem.classList.add("d-none");
        });
        document.getElementById("clearBtn").addEventListener("click", clearDataPage);
    });
})();
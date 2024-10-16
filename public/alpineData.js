document.addEventListener('alpine:init', () => {
    Alpine.data('alpine', () => {
        return {


            /*CROSS SECTIONAL CHECKS
-------------------------------------------------------------------------------------------------------------------------------------------------------- */

            loginSection: true,
            homepage: false,
            taskPage: false,
            machinePage: false,
            cropPage: false,
            analysisPage: false,
            profilePage: false,
            showPopup: false,
            taskUpdate: false,
            about: false,


            //BACKEND CHECKS
            cEmail: '',
            cOrg: '',
            cPassword: '',
            cUserName: '',
            cSurname: '',
            cUserRole: '',





            /* LOGIN AND SIGNUP PAGE
            -------------------------------------------------------------------------------------------------------------------------------------------------------- */
            email: '',
            userPassword: '',
            organisation: '',
            userRole: '',
            userName: '',
            userSurname: '',
            showSignUpForm: false,





            async fetchUserProfile() {
                try {
                    const response = await axios.get(`/profile/get_one_profile/${this.email}`);

                    if (response.status === 200) {
                        console.log('Profile:', response.data);
                        this.cEmail = response.data.E_mail;
                        this.cOrg = response.data.Organisation;
                        this.cPassword = response.data.User_Password;
                        this.cUserName = response.data.UserName;
                        this.cSurname = response.data.Surname;
                        this.cUserRole = response.data.User_Role;

                    } else {
                        alert('Failed');
                    }

                } catch (err) {
                    console.error('Error fetching profile:', err.message);
                    alert('An error occurred while fetching the profile.');
                }
            },

            async login() {
                try {
                    const login = await this.fetchUserProfile();

                    if (this.email === this.cEmail && this.userPassword === this.cPassword) {
                        this.loginSection = false;
                        this.homepage = true;
                        this.currentPage = 'homePage';
                        localStorage.setItem('profile', JSON.stringify({
                            email: this.cEmail,
                            organisation: this.cOrg,
                            password: this.cPassword,
                            userName: this.cUserName,
                            surname: this.cSurname,
                            userRole: this.cUserRole
                        }));
                        localStorage.setItem('currentPage', this.currentPage);
                    } else {
                        alert('Login failed. Please check your credentials.');
                    }
                } catch (err) {
                    console.error('Error fetching profile:', err.message);
                    alert('An error occurred while fetching the profile.');
                }
            },



            async fetchAddProfile() {
                try {
                    const response = axios.post(`/profile/add_new_user/`,
                        {
                            Organisation: this.organisation,
                            UserName: this.userName,
                            Surname: this.userSurname,
                            E_mail: this.email,
                            User_Password: this.userPassword,
                            User_Role: this.userRole
                        });
                    if (response.status === 200) {
                        alert('Profile added');
                        this.organisation = '';
                        this.userName = '';
                        this.userSurname = '';
                        this.email = '';
                        this.userPassword = '';
                        this.User_Role = '';
                    } else {
                        alert('Failed to load profile')
                    }
                } catch (err) {
                    console.error('Error', err.message)
                }
            },

            async submitSignUp() {

                await this.fetchAddProfile();


                /* alert('Form Submitted'); */
            },

            logout() {
                // Reset all state variables to their default values
                this.loginSection = true;
                this.homepage = false;
                this.taskPage = false;
                this.machineryPage = false;
                this.cropPage = false;
                this.analysisPage = false;

                // BACKEND CHECKS
                this.cEmail = '';
                this.cOrg = '';
                this.cPassword = '';
                this.cUserName = '';
                this.cSurname = '';
                this.cUserRole = '';

                // LOGIN AND SIGNUP PAGE
                this.email = '';
                this.userPassword = '';
                this.organisation = '';
                this.userRole = '';
                this.userName = '';
                this.userSurname = '';
                this.showSignUpForm = false;

                // Clear local storage
                localStorage.removeItem('profile');
                localStorage.removeItem('currentPage');

            },


            async fetchUpdateProfile() {
                try {
                    const response = await axios.put(`/profile/Update/user_profile/${this.email}`, {
                        Organisation: this.cOrg,
                        UserName: this.userName,
                        Surname: this.userSurname,
                        E_mail: this.email,
                        User_Password: this.userPassword,
                        User_Role: this.userRole
                    });

                    if (response.status === 200) {
                        alert('Profile updated successfully');
                        this.cEmail = this.email;
                        this.cPassword = this.userPassword;
                        this.cUserName = this.userName;
                        this.cSurname = this.userSurname;
                        this.cUserRole = this.userRole;
                    } else {
                        alert('Failed to update profile');
                    }
                } catch (err) {
                    console.error('Error', err.message);
                    alert('An error occurred while updating the profile');
                }
            },
            async updateProfile() {
                // Extract the values
                const organisation = this.cOrg || '';
                const userName = this.userName || '';
                const userSurname = this.userSurname || '';
                const email = this.email || '';
                const userPassword = this.userPassword || '';
                const userRole = this.userRole || '';

                // Check if any field is empty
                if (
                    organisation.trim() === '' ||
                    userName.trim() === '' ||
                    userSurname.trim() === '' ||
                    email.trim() === '' ||
                    userPassword.trim() === '' ||
                    userRole.trim() === ''
                ) {
                    alert('Please fill out all fields.');
                    return;
                }

                // Proceed to update profile
                await this.fetchUpdateProfile();
            },



            /* HOMEPAGE
-------------------------------------------------------------------------------------------------------------------------------------------------------- */
            sidebarOpen: false,
            goBack() {
                this._setPage('homepage');
                this.loginSection = false;
                this.homepage = true;
                this.taskPage = false;
                this.machinePage = false;
                this.cropPage = false;
                this.analysisPage = false;
                this.showPopup = false;
                this.taskUpdate = false;
                this.about = false;
                this.profilePage = false;
            },





            /* ANALYSIS PAGE
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            region: '',
            cropType: '',
            production: '',
            regionAngola: '',
            regionBotswana: '',
            regionEswatini: '',
            regionLesotho: '',
            regionMalawi: '',
            regionMozambique: '',
            regionSouthAfrica: '',
            regionTanzania: '',
            regionZambia: '',
            regionZimbabwe: '',
            cropMaize: '',
            cropRice: '',
            cropWheat: '',
            temperature: '',
            rainfall: '',
            humidity: '',
            predictedYield: '',
            year: '',
            selectedYear: '',
            yieldProduction: null,
            yieldShow: 0,
            fieldSize: '',




            updateRegion() {
                // Reset all region values to 0
                this.regionAngola = 0;
                this.regionBotswana = 0;
                this.regionEswatini = 0;
                this.regionLesotho = 0;
                this.regionMalawi = 0;
                this.regionMozambique = 0;
                this.regionSouthAfrica = 0;
                this.regionTanzania = 0;
                this.regionZambia = 0;
                this.regionZimbabwe = 0;


                switch (this.region) {
                    case 'Angola': this.regionAngola = 1; break;
                    case 'Botswana': this.regionBotswana = 1; break;
                    case 'Eswatini': this.regionEswatini = 1; break;
                    case 'Lesotho': this.regionLesotho = 1; break;
                    case 'Malawi': this.regionMalawi = 1; break;
                    case 'Mozambique': this.regionMozambique = 1; break;
                    case 'South Africa': this.regionSouthAfrica = 1; break;
                    case 'Tanzania': this.regionTanzania = 1; break;
                    case 'Zambia': this.regionZambia = 1; break;
                    case 'Zimbabwe': this.regionZimbabwe = 1; break;
                }
            },

            updateAnalysisCrop() {
                // Reset all crop values to 0
                this.cropMaize = 0;
                this.cropRice = 0;
                this.cropWheat = 0;


                switch (this.crop) {
                    case 'Maize': this.cropMaize = 1; break;
                    case 'Rice': this.cropRice = 1; break;
                    case 'Wheat': this.cropWheat = 1; break;
                }
            },



            unitOfMeasurement() {
                switch (this.production) {
                    case 'g':
                        this.yieldProduction = (this.predictedYield * this.fieldSize).toFixed(2) + ' grams';
                        this.yieldShow = (this.predictedYield * this.fieldSize).toFixed(2);
                        break;
                    case 'kg':
                        this.yieldProduction = ((this.predictedYield / 1000) * this.fieldSize).toFixed(2) + ' kilograms';
                        this.yieldShow = ((this.predictedYield / 1000) * this.fieldSize).toFixed(2);
                        break;
                    case 't':
                        this.yieldProduction = ((this.predictedYield / 1000000) * this.fieldSize).toFixed(2) + ' tons';
                        this.yieldShow = ((this.predictedYield / 1000000) * this.fieldSize).toFixed(2);
                        break;


                }
                console.log('Yield production:', this.yieldProduction);
            },



            async submitAnalysisData() {
                // Prepare the region and crop data
                await this.updateRegion();
                await this.updateAnalysisCrop();


                // Prepare the data payload for the API
                const dataPayload = {
                    HUMIDITY: this.humidity,
                    RAINFALL: this.rainfall,
                    TEMPERATURE: this.temperature,
                    TREND: 1961 - new Date().getFullYear(),
                    REGION_Angola: this.regionAngola,
                    REGION_Botswana: this.regionBotswana,
                    REGION_Eswatini: this.regionEswatini,
                    REGION_Lesotho: this.regionLesotho,
                    REGION_Malawi: this.regionMalawi,
                    REGION_Mozambique: this.regionMozambique,
                    REGION_SouthAfrica: this.regionSouthAfrica,
                    'REGION_United Republic of Tanzania': this.regionTanzania,
                    REGION_Zambia: this.regionZambia,
                    REGION_Zimbabwe: this.regionZimbabwe,
                    CROP_Maize: this.cropMaize,
                    CROP_Rice: this.cropRice,
                    CROP_Wheat: this.cropWheat,
                    HUMIDITY_TEMPERATURE: this.humidity * this.temperature
                };

                try {
                    // Make the POST request to your Flask API
                    const response = await axios.post(`https://agi-machine-learning.onrender.com/api/ml/predict`, dataPayload);

                    // Handle the API response and store the predicted yield
                    this.predictedYield = response.data.predicted_yield;

                    // Optionally, log the prediction to the console
                    console.log("Predicted Yield:", this.predictedYield);
                    this.unitOfMeasurement();
                } catch (error) {
                    console.error("Error during prediction:", error.response?.data || error.message);
                }

            },





            /* COMPARISON FUNCTION
-------------------------------------------------------------------------------------------------------------------------------------------------------- */



            comparisonResult: false,

            region1: '',
            cropType1: '',
            production1: '',
            regionAngola1: '',
            regionBotswana1: '',
            regionEswatini1: '',
            regionLesotho1: '',
            regionMalawi1: '',
            regionMozambique1: '',
            regionSouthAfrica1: '',
            regionTanzania1: '',
            regionZambia1: '',
            regionZimbabwe1: '',
            cropMaize1: '',
            cropRice1: '',
            cropWheat1: '',
            temperature1: '',
            rainfall1: '',
            humidity1: '',
            predictedYield1: '',
            year1: '',
            selectedYear1: '',
            yieldProduction1: null,
            fieldSize1: '',

            region2: '',
            cropType2: '',
            production2: '',
            regionAngola2: '',
            regionBotswana2: '',
            regionEswatini2: '',
            regionLesotho2: '',
            regionMalawi2: '',
            regionMozambique2: '',
            regionSouthAfrica2: '',
            regionTanzania2: '',
            regionZambia2: '',
            regionZimbabwe2: '',
            cropMaize2: '',
            cropRice2: '',
            cropWheat2: '',
            temperature2: '',
            rainfall2: '',
            humidity2: '',
            predictedYield2: '',
            year2: '',
            selectedYear2: '',
            yieldProduction2: null,
            fieldSize2: '',

            updateRegion1() {
                this.regionAngola1 = 0;
                this.regionBotswana1 = 0;
                this.regionEswatini1 = 0;
                this.regionLesotho1 = 0;
                this.regionMalawi1 = 0;
                this.regionMozambique1 = 0;
                this.regionSouthAfrica1 = 0;
                this.regionTanzania1 = 0;
                this.regionZambia1 = 0;
                this.regionZimbabwe1 = 0;

                switch (this.region1) {
                    case 'Angola': this.regionAngola1 = 1; break;
                    case 'Botswana': this.regionBotswana1 = 1; break;
                    case 'Eswatini': this.regionEswatini1 = 1; break;
                    case 'Lesotho': this.regionLesotho1 = 1; break;
                    case 'Malawi': this.regionMalawi1 = 1; break;
                    case 'Mozambique': this.regionMozambique1 = 1; break;
                    case 'South Africa': this.regionSouthAfrica1 = 1; break;
                    case 'Tanzania': this.regionTanzania1 = 1; break;
                    case 'Zambia': this.regionZambia1 = 1; break;
                    case 'Zimbabwe': this.regionZimbabwe1 = 1; break;
                }
            },

            updateRegion2() {
                this.regionAngola2 = 0;
                this.regionBotswana2 = 0;
                this.regionEswatini2 = 0;
                this.regionLesotho2 = 0;
                this.regionMalawi2 = 0;
                this.regionMozambique2 = 0;
                this.regionSouthAfrica2 = 0;
                this.regionTanzania2 = 0;
                this.regionZambia2 = 0;
                this.regionZimbabwe2 = 0;

                switch (this.region2) {
                    case 'Angola': this.regionAngola2 = 1; break;
                    case 'Botswana': this.regionBotswana2 = 1; break;
                    case 'Eswatini': this.regionEswatini2 = 1; break;
                    case 'Lesotho': this.regionLesotho2 = 1; break;
                    case 'Malawi': this.regionMalawi2 = 1; break;
                    case 'Mozambique': this.regionMozambique2 = 1; break;
                    case 'South Africa': this.regionSouthAfrica2 = 1; break;
                    case 'Tanzania': this.regionTanzania2 = 1; break;
                    case 'Zambia': this.regionZambia2 = 1; break;
                    case 'Zimbabwe': this.regionZimbabwe2 = 1; break;
                }
            },

            updateAnalysisCrop1() {
                this.cropMaize1 = 0;
                this.cropRice1 = 0;
                this.cropWheat1 = 0;

                switch (this.cropType1) {
                    case 'Maize1': this.cropMaize1 = 1; break;
                    case 'Rice1': this.cropRice1 = 1; break;
                    case 'Wheat1': this.cropWheat1 = 1; break;
                }
            },

            updateAnalysisCrop2() {
                this.cropMaize2 = 0;
                this.cropRice2 = 0;
                this.cropWheat2 = 0;

                switch (this.cropType2) {
                    case 'Maize2': this.cropMaize2 = 1; break;
                    case 'Rice2': this.cropRice2 = 1; break;
                    case 'Wheat2': this.cropWheat2 = 1; break;
                }
            },

            unitOfMeasurement1() {
                switch (this.production1) {
                    case 'g':
                        this.yieldProduction1 = (this.predictedYield1 * this.fieldSize1).toFixed(2) + ' grams';
                        this.yieldShow1 = (this.predictedYield1 * this.fieldSize1).toFixed(2);
                        break;
                    case 'kg':
                        this.yieldProduction1 = ((this.predictedYield1 / 1000) * this.fieldSize1).toFixed(2) + ' kilograms';
                        this.yieldShow1 = ((this.predictedYield1 / 1000) * this.fieldSize1).toFixed(2);
                        break;
                    case 't':
                        this.yieldProduction1 = ((this.predictedYield1 / 1000000) * this.fieldSize1).toFixed(2) + ' tons';
                        this.yieldShow1 = ((this.predictedYield1 / 1000000) * this.fieldSize1).toFixed(2);
                        break;
                }
                console.log('Yield production 1', this.yieldProduction1);
            },

            unitOfMeasurement2() {
                switch (this.production2) {
                    case 'g':
                        this.yieldProduction2 = (this.predictedYield2 * this.fieldSize2).toFixed(2) + ' grams';
                        this.yieldShow2 = (this.predictedYield2 * this.fieldSize2).toFixed(2);
                        break;
                    case 'kg':
                        this.yieldProduction2 = ((this.predictedYield2 / 1000) * this.fieldSize2).toFixed(2) + ' kilograms';
                        this.yieldShow2 = ((this.predictedYield2 / 1000) * this.fieldSize2).toFixed(2);
                        break;
                    case 't':
                        this.yieldProduction2 = ((this.predictedYield2 / 1000000) * this.fieldSize2).toFixed(2) + ' tons';
                        this.yieldShow2 = ((this.predictedYield2 / 1000000) * this.fieldSize2).toFixed(2);
                        break;
                }
                console.log('Yield production 2', this.yieldProduction2);

            },


            async submitAnalysisData1() {
                // Prepare the data payload for the first region/crop
                const dataPayload1 = {
                    HUMIDITY: this.humidity1,
                    RAINFALL: this.rainfall1,
                    TEMPERATURE: this.temperature1,
                    TREND: 1961 - new Date().getFullYear(),
                    REGION_Angola: this.regionAngola1,
                    REGION_Botswana: this.regionBotswana1,
                    REGION_Eswatini: this.regionEswatini1,
                    REGION_Lesotho: this.regionLesotho1,
                    REGION_Malawi: this.regionMalawi1,
                    REGION_Mozambique: this.regionMozambique1,
                    REGION_SouthAfrica: this.regionSouthAfrica1,
                    'REGION_United Republic of Tanzania': this.regionTanzania1,
                    REGION_Zambia: this.regionZambia1,
                    REGION_Zimbabwe: this.regionZimbabwe1,
                    CROP_Maize: this.cropMaize1,
                    CROP_Rice: this.cropRice1,
                    CROP_Wheat: this.cropWheat1,
                    HUMIDITY_TEMPERATURE: this.humidity1 * this.temperature1
                };

                try {
                    // Make the POST request to your Flask API for the first region/crop
                    const response1 = await axios.post(`https://agi-machine-learning.onrender.com/api/ml/predict`, dataPayload1);

                    // Handle the API response and store the predicted yield
                    this.predictedYield1 = response1.data.predicted_yield;

                    // Optionally, log the prediction to the console
                    console.log("Predicted Yield1:", this.predictedYield1);
                    this.unitOfMeasurement1()

                } catch (error) {
                    console.error("Error during prediction for Region 1:", error.response?.data || error.message);
                    return 0; // Return 0 in case of an error
                }
            },

            async submitAnalysisData2() {
                // Prepare the data payload for the second region/crop
                const dataPayload2 = {
                    HUMIDITY: this.humidity2,
                    RAINFALL: this.rainfall2,
                    TEMPERATURE: this.temperature2,
                    TREND: 1961 - new Date().getFullYear(),
                    REGION_Angola: this.regionAngola2,
                    REGION_Botswana: this.regionBotswana2,
                    REGION_Eswatini: this.regionEswatini2,
                    REGION_Lesotho: this.regionLesotho2,
                    REGION_Malawi: this.regionMalawi2,
                    REGION_Mozambique: this.regionMozambique2,
                    REGION_SouthAfrica: this.regionSouthAfrica2,
                    'REGION_United Republic of Tanzania': this.regionTanzania2,
                    REGION_Zambia: this.regionZambia2,
                    REGION_Zimbabwe: this.regionZimbabwe2,
                    CROP_Maize: this.cropMaize2,
                    CROP_Rice: this.cropRice2,
                    CROP_Wheat: this.cropWheat2,
                    HUMIDITY_TEMPERATURE: this.humidity2 * this.temperature2
                };

                try {
                    // Make the POST request to your Flask API for the second region/crop
                    const response2 = await axios.post(`https://agi-machine-learning.onrender.com/api/ml/predict`, dataPayload2);

                    // Handle the API response and store the predicted yield
                    this.predictedYield2 = response2.data.predicted_yield;

                    // Optionally, log the prediction to the console
                    console.log("Predicted Yield2:", this.predictedYield2);
                    this.unitOfMeasurement2();

                } catch (error) {
                    console.error("Error during prediction for Region 2:", error.response?.data || error.message);
                    return 0; // Return 0 in case of an error
                }
            },


            async compareYield() {
                await this.updateRegion1();
                await this.updateRegion2();
                await this.updateAnalysisCrop1();
                await this.updateAnalysisCrop2();

                // Simulate getting predicted yield from API
                this.predictedYield1 = await this.submitAnalysisData1();
                this.predictedYield2 = await this.submitAnalysisData2();


                this.comparisonResult = true
            },

            openAnalysis() {
                this.analysisPage = true;
                this.homepage = false
                this._setPage('analysisPage');
            },



            /* TASK SHCEDULER
-------------------------------------------------------------------------------------------------------------------------------------------------------- */

            task: '',
            assigner: this.cUserName,
            assignee: '',
            description: '',
            status: '',
            taskList: [],
            taskToDelete: '',
            deadline: '',
            selectedTask: '',

            async addTask() {
                // Ensure all variables are strings and initialized
                const task = this.task || '';
                const assignee = this.assignee || '';
                const status = this.status || '';
                const description = this.description || '';

                // Check if any field is empty
                if (task.trim() === '' || assignee.trim() === '' || status.trim() === '' || description.trim() === '') {
                    alert('Please fill out all fields.');
                    return;
                }

                try {
                    const response = await axios.post(`/tasks/add_new_task/${this.cOrg}`, {
                        Organisation: this.cOrg,
                        Task: task,
                        Assigner: this.cUserName,
                        Assignee: this.assignee,
                        Status: this.status,
                        Description: this.description,
                        Dead_line: this.deadline,
                    });

                    if (response.status === 200) {
                        this.clearFields(); // Clear input fields
                        await this.fetchTasks();
                    } else {
                        alert('Failed to add task');
                    }
                } catch (err) {
                    console.error('Error adding task:', err.message);
                    alert('An error occurred while adding the task.');
                }
            },

            // Fetch tasks
            async fetchTasks() {
                try {
                    const response = await axios.get(`/tasks/retrieve_tasks/${this.cOrg}`);

                    if (response.status === 200) {
                        this.taskList = response.data;
                    } else {
                        alert('Failed to fetch tasks');
                    }
                } catch (err) {
                    console.error('Error fetching tasks:', err.message);
                    alert('An error occurred while fetching the tasks.');
                }
            },


            async loadTasks() {
                await this.fetchTasks();
                console.log('Tasklist', this.taskList)
            },

            // Update an existing task

            openTaskUpdate(taskId) {
                this.showPopup = true;
                this.taskUpdate = true;

                this.selectedTask = taskId;
                this.task = task.Task;
                this.assignee = task.Assignee;
                this.status = task.Status;
                this.deadline = task.Dead_line;
                this.description = task.Description;
            },

            async updateTask() {


                try {
                    const response = await axios.put(`/tasks/Update_task/${this.cOrg}/${this.selectedTask}`, {
                        Task: this.task,
                        Assigner: this.cUserName,
                        Assignee: this.assignee,
                        Status: this.status,
                        Description: this.description,
                        Dead_line: this.deadline,
                    });

                    if (response.status === 200) {
                    } else {
                        alert('Failed to update task');
                    }
                } catch (err) {
                    console.error('Error updating task:', err.message);
                    alert('An error occurred while updating the task.');
                }
            },

            // Delete a task
            async deleteTask(taskID) {

                try {
                    const response = await axios.delete(`/tasks/Delete_task/${this.cOrg}/${taskID}`);

                    if (response.status === 200) {
                    } else {
                        alert('Failed to delete task');
                    }
                } catch (err) {
                    console.error('Error deleting task:', err.message);
                    alert('An error occurred while deleting the task.');
                }
            },

            // Clear input fields
            clearFields() {
                this.task = '';
                this.assigner = '';
                this.assignee = '';
                this.status = '';
            },

            openTask() {
                this.taskPage = true;
                this.homepage = false;
                this._setPage('taskPage');
            },

            checkUser() {
                console.log('cEmail:', this.cEmail);
                console.log('cOrg:', this.cOrg);
                console.log('cPassword:', this.cPassword);
                console.log('cUserName:', this.cUserName);
                console.log('cSurname:', this.cSurname);
                console.log('cUserRole:', this.cUserRole);
            },


            /* machine INVENTORY
         -------------------------------------------------------------------------------------------------------------------------------------------------------- */
            machinery: '',
            reg_number: '',
            condition: '',
            issue: '',
            machineryList: [],
            selectedMachine: '',
            machineUpdate: false,

            openMachine() {
                this.machinePage = true;
                this.homepage = false;
                this._setPage('machinePage');
            },

            // Add new machinery
            async addMachinery() {
                if (this.machinery.trim() === '' || this.reg_number.trim() === '' || this.condition.trim() === '' || this.issue.trim() === '') {
                    alert('Please fill out all fields.');
                    return;
                }

                try {
                    const response = await axios.post(`/machines/Add_machine/${this.cOrg}/${this.reg_number}`, {
                        Organisation: this.cOrg,
                        Machinery: this.machinery,
                        reg_number: this.reg_number,
                        Condition: this.condition,
                        Issue: this.issue
                    });

                    if (response.status === 200) {
                        this.machineryList.push({
                            organisation: this.cOrg,
                            machinery: this.machinery,
                            reg_number: this.reg_number,
                            condition: this.condition,
                            issue: this.issue
                        });
                        this.clearFieldsM();
                        this.loadMachine();
                        await this.fetchMachinery
                    } else {
                        alert('Failed to add machinery');
                    }
                } catch (err) {
                    console.error('Error adding machinery:', err.message);
                    alert('An error occurred while adding the machinery.');
                }
            },

            // Fetch all machinery
            async fetchMachinery() {
                try {
                    const response = await axios.get(`/machines/retrieve_all_machines/${this.cOrg}`);

                    if (response.status === 200) {
                        this.machineryList = response.data;
                    } else {
                        alert('Failed to fetch machinery');
                    }
                } catch (err) {
                    console.error('Error fetching machinery:', err.message);
                    alert('An error occurred while fetching the machinery.');
                }
            },

            async loadMachine() {
                await this.fetchMachinery();
                console.log('Machine list', this.machineryList)
            },

            // Update existing machinery
            async updateMachinery() {

                try {
                    const response = await axios.put(`/machines/Update_machine/${this.cOrg}/${this.selectedMachine}`, {
                        Organisation: this.cOrg,
                        Machinery: this.machinery,
                        reg_number: this.reg_number,
                        Condition: this.condition,
                        Issue: this.issue,
                    });

                    if (response.status === 200) {
                    } else {
                        alert('Failed to update machinery');
                    }
                } catch (err) {
                    console.error('Error updating machinery:', err.message);
                    alert('An error occurred while updating the machinery.');
                }
            },

            openMachineUpdate(machineId) {
                this.showPopup = true;
                this.machineUpdate = true;
                this.selectedMachine = machineId;
            },


            // Delete machinery
            async deleteMachinery(machineID) {


                try {
                    const response = await axios.delete(`/machines/Delete_machine/${this.cOrg}/${machineID}`);

                    if (response.status === 200) {
                        this.loadMachine;
                    } else {
                        alert('Failed to delete machinery');
                    }
                } catch (err) {
                    console.error('Error deleting machinery:', err.message);
                    alert('An error occurred while deleting the machinery.');
                }
            },



            // Clear input fields
            clearFieldsM() {
                this.machinery = '';
                this.reg_number = '';
                this.condition = '';
                this.issue = '';
            },



            /* CROP INVENTORY
            -------------------------------------------------------------------------------------------------------------------------------------------------------- */
            // Crop inventory data
            newCropType: '',
            newCropYield: '',
            cropList: [],
            selectedCrop: '',
            cropUpdate: false,


            // Fetch all crops for an organization
            async fetchCrops() {
                try {
                    const response = await axios.get(`/crops/Get_crops/${this.cOrg}`);

                    if (response.status === 200) {
                        this.cropList = response.data;
                    } else {
                        alert('Failed to fetch crops');
                    }
                } catch (err) {
                    console.error('Error fetching crops:', err.message);
                    alert('An error occurred while fetching crops.');
                }
            },

            async loadCrops() {
                await this.fetchCrops();
                console.log('Crop list', this.cropList)
            },

            // Fetch a single type of crop
            async fetchCropByType() {
                try {
                    const response = await axios.get(`/Get_one_type/${this.cOrg}/${this.cropType}`);

                    if (response.status === 200) {
                        // Handle the single crop type data here
                        console.log('Crop details:', response.data);
                    } else {
                        alert('Failed to fetch crop type');
                    }
                } catch (err) {
                    console.error('Error fetching crop type:', err.message);
                    alert('An error occurred while fetching the crop type.');
                }
            },

            // Add a new crop record
            async addCrop() {
                if (this.newCropType.trim() === '' || this.newCropYield.trim() === '') {
                    alert('Please fill out all fields.');
                    return;
                }

                try {
                    const response = await axios.post('/crops/Add_a_crop', {
                        Organisation: this.cOrg,
                        Crop: this.newCropType,
                        Yield: this.newCropYield,
                    });

                    if (response.status === 200) {
                        this.clearCropFields();
                        this.loadCrops();
                        await this.fetchCrops();
                    } else {
                        alert('Failed to add crop');
                    }
                } catch (err) {
                    console.error('Error adding crop:', err.message);
                    alert('An error occurred while adding the crop.');
                }
            },

            // Update an existing crop record
            async updateCrop() {
                try {
                    const response = await axios.put(`/crops/Update_crop/${this.selectedCrop}`, {
                        Crop: this.newCropType,
                        Yield: this.newCropYield
                    });

                    if (response.status === 200) {
                        await this.fetchCrops();
                    } else {
                        alert('Failed to update crop');
                    }
                } catch (err) {
                    console.error('Error updating crop:', err.message);
                    alert('An error occurred while updating the crop.');
                }
            },

            openCropUpdate(cropId) {
                this.showPopup = true;
                this.cropUpdate = true;
                this.selectedCrop = cropId;
            },


            // Delete a crop record
            async deleteCrop(cropId) {
                try {
                    const response = await axios.delete(`/crops/Delete_crop/${cropId}`);

                    if (response.status === 200) {
                        this.loadCrops();
                    } else {
                        alert('Failed to delete crop');
                    }
                } catch (err) {
                    console.error('Error deleting crop:', err.message);
                    alert('An error occurred while deleting the crop.');
                }
            },

            // Clear crop input fields
            clearCropFields() {
                this.cropType = '';
                this.cropYield = '';
            },



            openCrop() {
                this.cropPage = true;
                this.homepage = false;
                this._setPage('cropPage');
            },


            /* Profile
            -------------------------------------------------------------------------------------------------------------------------------------------------------- */

            openProfile() {
                this.profilePage = true;
                this.homepage = false;
                this._setPage('profilePage');
            },

            /* ABOUT
            -------------------------------------------------------------------------------------------------------------------------------------------------------- */

            openAbout() {
                this.about = true;
                this.homepage = false;
                this._setPage('about');
            },

            _setPage(page) {
                this.loginSection = false;
                this.homepage = false;
                this.taskPage = false;
                this.machinePage = false;
                this.cropPage = false;
                this.analysisPage = false;
                this.profilePage = false;
                this.about = false;

                this[page] = true;
                localStorage.setItem('currentPage', page);
            },
            /* init
 -------------------------------------------------------------------------------------------------------------------------------------------------------- */

            async init() {

                const currentPage = localStorage.getItem('currentPage') || 'loginSection';
                this[currentPage] = true;
                if (currentPage !== 'loginSection') {
                    this.loginSection = false;
                }

                const storedProfile = JSON.parse(localStorage.getItem('profile'));
                if (storedProfile) {
                    this.cEmail = storedProfile.email;
                    this.cOrg = storedProfile.organisation;
                    this.cPassword = storedProfile.password;
                    this.cUserName = storedProfile.userName;
                    this.cSurname = storedProfile.surname;
                    this.cUserRole = storedProfile.userRole;

                    // Automatically log in the user
                    this.loginSection = false;

                };

                await this.loadTasks();
                await this.loadMachine();
                await this.loadCrops();
                await this.checkUser();

            },





        }
    });
});



new Vue({
    el: '#app',
    data: {
        
        showForm: false,
        formData: {
            firstName: '',
            lastName: '',
            role: '',
            email: '',
            phone: ''
        },
        tools: [
            {
                name: 'Referal tool',
                description: 'xxx **xxxx**',
                link: '../referal/referal.html?employee={firstName}&employee_email={email}&employee_role={role}&customer={customer}',
                showDescription: false
            },
            {
                name: 'Demo chauffagiste',
                description: 'xxx **xxxx**',
                link: 'https://storage.googleapis.com/pnbx-cdn/static_demo/chauffetvous/chauffetvous.html?email={email}&phone={phone}',
                showDescription: false
            },
            {
                name: 'Demo timesheets',
                description: 'xxx **xxxx**',
                link: 'https://flow.penbox.io/3609741c-ced2-45e2-89ad-d3f802f4c964',
                showDescription: false
            },
            {
                name: 'AI builder for AML accountancy',
                description: 'xxx **xxxx**',
                link: 'https://builder.penbox.io/ai?prompt=Cr%C3%A9er%20un%20formulaire%20demandant%20les%20coordonn%C3%A9es%20du%20client%20%28Nom%20de%20la%20soci%C3%A9t%C3%A9%2C%20num%C3%A9ro%20d%27entreprise%29%20et%20posant%20ensuite%20les%20questions%20suivantes%20dans%20des%20sections%20distinctes%3A%0A%0A1.%20Crit%C3%A8res%20li%C3%A9s%20au%20secteur%20d%27activit%C3%A9%20du%20client%20%3A%0A-%20Le%20secteur%20d%27activit%C3%A9%20du%20client%20est-il%20sensible%20au%20blanchiment%20d%27argent%20%3F%0A-%20Le%20client%20est-il%20impliqu%C3%A9%20dans%20des%20transactions%20en%20esp%C3%A8ces%20%3F%0A-%20Le%20client%20est-il%20impliqu%C3%A9%20dans%20des%20transactions%20transfrontali%C3%A8res%20%3F%0A-%20Le%20client%20est-il%20impliqu%C3%A9%20dans%20des%20transactions%20avec%20des%20pays%20%C3%A0%20haut%20risque%20%3F%0A%0A2.%20Crit%C3%A8res%20li%C3%A9s%20au%20client%20%3A%0A-%20Le%20client%20a-t-il%20fait%20preuve%20de%20m%C3%A9connaissance%20du%20march%C3%A9%20dans%20lequel%20il%20op%C3%A8re%2C%20de%20la%20zone%20g%C3%A9ographique%20dans%20laquelle%20il%20op%C3%A8re%20ou%20de%20son%20business%20model%20%3F%0A-%20Le%20client%20est-il%20li%C3%A9%20%C3%A0%20un%20PEP%20d%E2%80%99une%20quelconque%20mani%C3%A8re%20%3F%0A-%20Avez-vous%20le%20sentiment%20que%20le%20Client%20aurait%20pu%20se%20passer%20du%20concours%20d%E2%80%99un%20Expert-Comptable%20dans%20le%20cadre%20de%20la%20mission%20qu%E2%80%99il%20nous%20confie%20%3F%0A-%20Est-ce%20que%20le%20Client%20fait%20appel%20%C3%A0%20nous%20dans%20le%20cadre%20d%E2%80%99une%20op%C3%A9ration%20insolite%20au%20regard%20de%20son%20objet%20social%20%3F%0A-%20Le%20client%20nous%20contacte-t-il%20dans%20une%20urgence%20dont%20l%E2%80%99explication%20n%E2%80%99est%20pas%20claire%20%3F%0A-%20Le%20client%20nous%20confie-t-il%20une%20mission%20ponctuelle%20qui%20habituellement%20aurait%20d%C3%BB%20faire%20l%E2%80%99objet%20d%E2%80%99un%20suivi%20continu%20%3F%0A%0A3.%20Crit%C3%A8res%20li%C3%A9s%20%C3%A0%20la%20prestation%20%3A%0A-%20La%20mission%20confi%C3%A9e%20par%20le%20client%20est-elle%20complexe%20ou%20inhabituelle%20%3F%0A-%20La%20mission%20confi%C3%A9e%20par%20le%20client%20implique-t-elle%20des%20transactions%20en%20esp%C3%A8ces%20%3F%0A-%20La%20mission%20confi%C3%A9e%20par%20le%20client%20implique-t-elle%20des%20transactions%20transfrontali%C3%A8res%20%3F%0A-%20La%20mission%20confi%C3%A9e%20par%20le%20client%20implique-t-elle%20des%20transactions%20avec%20des%20pays%20%C3%A0%20haut%20risque%20%3F%0A%0APour%20chaque%20question%2C%20proposer%20des%20r%C3%A9ponses%20oui%20%2F%20non',
                showDescription: false
            },
            {
                name: 'Demo real estate',
                description: 'xxx **xxxx**',
                link: 'https://flow.penbox.io/ea7e5e64-abce-44ea-8347-9bd54e804411',
                showDescription: false
            },
            // Add more tools here
        ]
    },
    methods: {
        toggleForm() {
            this.showForm = !this.showForm;
        },
        onFormInputChanged() {
            // Update URL with form data
            const queryParams = new URLSearchParams(this.formData);
            history.replaceState(null, '', '?' + queryParams.toString());
        },
        openTool(tool) {
            if (!tool.showDescription) {
                this.toggleDescription(tool);
            } else {
                this.redirectToTool(tool.link);
            }
        },
        generateToolLink(tool) {
            let dynamicLink = tool.link;

            for (const key in this.formData) {
                const placeholder = `{${key}}`;
                if (dynamicLink.includes(placeholder)) {
                    dynamicLink = dynamicLink.replace(new RegExp(placeholder, 'g'), this.formData[key]);
                }
            }

            const unmatchedPlaceholders = dynamicLink.match(/{[^}]+}/g);
            if (unmatchedPlaceholders) {
                unmatchedPlaceholders.forEach(placeholder => {
                    const userInput = prompt(`Enter value for placeholder ${placeholder}:`);
                    if (userInput !== null) {
                        dynamicLink = dynamicLink.replace(new RegExp(placeholder, 'g'), userInput);
                    }
                });
            }

            return dynamicLink;
        },
        toggleDescription(tool) {
            // Close all descriptions except the clicked one
            this.tools.forEach(t => {
                if (t !== tool) {
                    t.showDescription = false;
                }
            });
            tool.showDescription = !tool.showDescription;
        },
        redirectToTool(tool) {
            const dynamicLink = this.generateToolLink(tool);
            console.log(dynamicLink);
            window.location.href = dynamicLink;
        },
        copyToClipboard() {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('URL copied to clipboard!');
            }).catch(error => {
                console.error('Copying failed:', error);
            });
        }
    },
    mounted() {
        // Prefill form data from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        for (const key in this.formData) {
            if (urlParams.has(key)) {
                this.formData[key] = urlParams.get(key);
            }
        }
    }
});
const files = [...document.querySelector('input[type=file]').files];
const promises = files.map((file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const res = event.target.result;
            console.log(res);
            resolve(res);
            return res;
        }
        reader.readAsDataURL(file)
    })
})

Promise.all(promises).then(
    (base64files) => {//console.log(base64files)

        const data = {
            api_key: "jw2iRh1UfQKvxZGe7mCzPAHEaZTNuRamNqcYUWyHHTc0uCpG7t",
            images: base64files,
            modifiers: ["crops_fast", "similar_images"],
            plant_language: "en",
            plant_details: ["common_names",
                "url",
                "name_authority",
                "wiki_description",
                "taxonomy",
                "synonyms"]
        };
        console.log(data)

        fetch('https://api.plant.id/v2/identify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    })

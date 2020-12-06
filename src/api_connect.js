import store from './store.js';

const api_scan = function(){
            let imagesToScan = [];
            for(let i = 0 ; i < store.getters.getDiscoveryImages.length ; i++){

                imagesToScan.push(store.getters.getDiscoveryImages[i].photoPath)
            }
            const datas = {
                api_key: "ZA54kZ7WT2A7nQhCyvYvePuXucjnAIDW0v4qzJq98GOYQ1268c",
                images: imagesToScan,
                modifiers: ["crops_fast", "similar_images"],
                plant_language: "en",
                plant_details: ["common_names",
                    "url",
                    "name_authority",
                    "wiki_description",
                    "taxonomy",
                    "synonyms"]
            };

            fetch('https://api.plant.id/v2/identify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datas),
            })
                .then(response => response.json())
                .then(datas => {
                    let cards;
                    cards = [
                        {percentage: null, show: false, title: null, subtitle: null, src: null, flex: 3, info: null},
                        {percentage: null, show: false, title: null, subtitle: null, src: null, flex: 3, info: null},
                        {percentage: null, show: false, title: null, subtitle: null, src: null, flex: 3, info: null},
                        {percentage: null, show: false, title: null, subtitle: null, src: null, flex: 3, info: null}
                    ]
                    let i;
                    for (i = 0; i < 4; i++) {
                        if (datas.suggestions[i].probability !== null) {
                            cards[i].percentage = Math.round(datas.suggestions[i].probability * 1000) / 10;
                        } else{
                            cards[i].percentage = 0;
                        }
                        if (datas.suggestions[i].plant_details.common_names !== null){
                            cards[i].title = datas.suggestions[i].plant_details.common_names[0];
                        } else {
                            cards[i].title = "Unknown common name"
                        }
                        if(datas.suggestions[i].plant_details.scientific_name !== null){
                            cards[i].subtitle = datas.suggestions[i].plant_details.scientific_name;
                        } else {
                            cards[i].subtitle = "Unknown scientific name"
                        }
                        if(datas.suggestions[i].plant_details.wiki_description !== null){
                            cards[i].info = datas.suggestions[i].plant_details.wiki_description.value;
                        } else {
                            cards[i].info = "Unknown wiki info"
                        }
                        if(datas.suggestions[i].similar_images !== null){
                            cards[i].src = datas.suggestions[i].similar_images[0].url;
                        } else {
                            cards[i].src = store.getters.getDiscoveryImages[0].photoPath;
                        }
                    }
                    store.commit('updateInformationCards', cards);
                })
                .catch((error) => {
                    store.commit("updateSnackbarMessage",'Something went wrong! please try again later.' );
                    store.commit("updateSnackbar", true);
                    console.error('Error:', error);
                });
}

export default api_scan;

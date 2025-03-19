document.addEventListener('DOMContentLoaded', function() {
    // Sample CSV data in case no file is uploaded
    const sampleCsvData = `id,name,thumbnail,episode_id,episode_name,embed_code,category
1,Stranger Things,https://picsum.photos/id/237/400/225,ST01,Chapter One: The Vanishing of Will Byers,embed1,Sci-Fi
2,The Crown,https://picsum.photos/id/238/400/225,TC01,Wolferton Splash,embed2,Drama
3,Ozark,https://picsum.photos/id/239/400/225,OZ01,Sugarwood,embed3,Drama
4,Narcos,https://picsum.photos/id/240/400/225,NC01,Descenso,embed4,Crime
5,Dark,https://picsum.photos/id/241/400/225,DK01,Secrets,embed5,Sci-Fi
6,Money Heist,https://picsum.photos/id/242/400/225,MH01,Episode 1,embed6,Crime
7,Black Mirror,https://picsum.photos/id/243/400/225,BM01,White Christmas,embed7,Sci-Fi
8,Mindhunter,https://picsum.photos/id/244/400/225,MN01,Episode 1,embed8,Crime
9,The Witcher,https://picsum.photos/id/245/400/225,TW01,The End's Beginning,embed9,Fantasy
10,Squid Game,https://picsum.photos/id/246/400/225,SG01,Red Light Green Light,embed10,Thriller
11,The Queen's Gambit,https://picsum.photos/id/247/400/225,QG01,Openings,embed11,Drama
12,Bridgerton,https://picsum.photos/id/248/400/225,BR01,Diamond of the First Water,embed12,Drama
13,Cobra Kai,https://picsum.photos/id/249/400/225,CK01,Ace Degenerate,embed13,Comedy
14,The Umbrella Academy,https://picsum.photos/id/250/400/225,UA01,We Only See Each Other at Weddings and Funerals,embed14,Sci-Fi
15,Lupin,https://picsum.photos/id/251/400/225,LP01,Chapter 1,embed15,Crime
16,Stranger Things,https://picsum.photos/id/252/400/225,ST02,Chapter Two: The Weirdo on Maple Street,embed16,Sci-Fi
17,The Crown,https://picsum.photos/id/253/400/225,TC02,Hyde Park Corner,embed17,Drama
18,Ozark,https://picsum.photos/id/254/400/225,OZ02,Blue Cat,embed18,Drama
19,Breaking Bad,https://picsum.photos/id/255/400/225,BB01,Pilot,embed19,Crime
20,Better Call Saul,https://picsum.photos/id/256/400/225,BCS01,Uno,embed20,Crime`;

    // Configuration for header behavior
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Modal functionality
    const modal = document.getElementById('content-modal');
    const closeModal = document.querySelector('.close-modal');
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Function to display modal with content details
    function showContentDetails(item) {
        const modalDetails = document.getElementById('modal-details');
        
        modalDetails.innerHTML = `
            <div class="modal-hero" style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6), #181818), url('${item.thumbnail}');">
                <div class="modal-content-overlay">
                    <h1 class="modal-title">${item.name}</h1>
                    <div class="modal-buttons">
                        <button class="btn play-btn"><i class="fas fa-play"></i> Play</button>
                        <button class="btn more-info-btn"><i class="fas fa-plus"></i> My List</button>
                    </div>
                </div>
            </div>
            <div class="modal-info">
                <div class="modal-left">
                    <div class="modal-description">
                        <p>Episode: ${item.episode_name}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl.</p>
                    </div>
                </div>
                <div class="modal-right">
                    <div class="modal-meta">
                        <p>Category: ${item.category}</p>
                        <p>Episode ID: ${item.episode_id}</p>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    // Function to create thumbnail element
    function createThumbnailElement(item) {
        const thumbnailItem = document.createElement('div');
        thumbnailItem.className = 'thumbnail-item';
        
        thumbnailItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.name}">
            <div class="thumbnail-info">
                <h3 class="thumbnail-title">${item.name}</h3>
                <p class="thumbnail-episode">${item.episode_name}</p>
            </div>
        `;
        
        thumbnailItem.addEventListener('click', () => {
            showContentDetails(item);
        });
        
        return thumbnailItem;
    }

    // Function to organize content by categories
    function organizeByCategory(data) {
        const categories = {};
        
        data.forEach(item => {
            // Skip items without a category or other required fields
            if (!item.category || !item.name) {
                return;
            }
            
            // Create category if it doesn't exist
            if (!categories[item.category]) {
                categories[item.category] = [];
            }
            
            // Make sure thumbnail URLs are properly formatted
            if (!item.thumbnail || !item.thumbnail.startsWith('http')) {
                item.thumbnail = 'https://picsum.photos/400/225?random=' + Math.floor(Math.random() * 1000);
            }
            
            // Ensure episode name exists
            if (!item.episode_name) {
                item.episode_name = 'Episode';
            }
            
            categories[item.category].push(item);
        });
        
        return categories;
    }

    // Function to render content rows by category
    function renderContentRows(categories) {
        const categoriesContainer = document.querySelector('.categories-container');
        categoriesContainer.innerHTML = '';
        
        for (const category in categories) {
            const contentRow = document.createElement('div');
            contentRow.className = 'content-row';
            
            contentRow.innerHTML = `
                <div class="row-header">
                    <h2 class="row-title">${category}</h2>
                    <a href="#" class="see-all">See All</a>
                </div>
                <div class="thumbnails-container" id="category-${category.replace(/\s+/g, '-').toLowerCase()}"></div>
            `;
            
            categoriesContainer.appendChild(contentRow);
            
            const thumbnailsContainer = contentRow.querySelector('.thumbnails-container');
            categories[category].forEach(item => {
                thumbnailsContainer.appendChild(createThumbnailElement(item));
            });
        }
    }

    // Function to use sample data as fallback
    function fallbackToSampleData() {
        console.log('Using sample data as fallback');
        const parsedSample = Papa.parse(sampleCsvData, { header: true, skipEmptyLines: true }).data;
        const categories = organizeByCategory(parsedSample);
        renderContentRows(categories);
    }

    // Function to load data from the Google Sheets CSV
    function loadCSVData() {
        // Directly use the Google Sheets CSV URL
        const googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/1xsz1l9reLyakcG1cQBZjytMJ6KZF0zX8Zac4a_YE4C0/export?format=csv';
        
        console.log('Fetching data from Google Sheets:', googleSheetsUrl);
        
        fetch(googleSheetsUrl)
            .then(response => {
                if (!response.ok) {
                    console.error('Failed to fetch CSV:', response.status);
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(csvData => {
                console.log('CSV data fetched successfully');
                
                // Parse the CSV data
                Papa.parse(csvData, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function(results) {
                        console.log('CSV parsing complete:', results.data.length, 'records found');
                        
                        if (results.data && results.data.length > 0) {
                            const categories = organizeByCategory(results.data);
                            renderContentRows(categories);
                        } else {
                            console.error('No data found in CSV');
                            fallbackToSampleData();
                        }
                    },
                    error: function(error) {
                        console.error('Error parsing CSV:', error);
                        fallbackToSampleData();
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching CSV from Google Sheets:', error);
                fallbackToSampleData();
            });
    }

    // Initialize the application
    loadCSVData();
});


enum Category {
arts = "arts",
baseball = "baseball",
business = "business",
christianity = "christianity",
comedy = "comedy",
culture = "culture",
education = "education",     
entertainment = "entertainment",
fantasy = "fantasy",       
fiction = "fiction",       
film = "film",          
games = "games",         
government = "government",    
health = "health",        
history = "history",       
kids = "kids",          
leisure = "leisure",       
music = "music",         
natural = "natural",       
news = "news",          
philosophy = "philosophy",    
politics = "politics",      
religion = "religion",      
science = "science",       
society = "society",       
spirituality = "spirituality",  
sports = "sports",        
technology = "technology",    
true = "true",     
crime = "crime",
tv = "tv",            
}

export const getCategoryList = (): string[] => {
    return Object.values(Category)
}

export default Category;
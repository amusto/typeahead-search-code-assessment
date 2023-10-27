# My Notes

### BACKEND

I focused on following the directions you provided in your README.  
Based on your comment to review "NodeJS http.serverResponse documentation" I chose to complete all server side code without any external libraries such as Express, Cors or body-parser.

##### Handling data (My assumptions)
- I'm only returning products where isActive = "true" 

##### I defined a unique set of product tags
```
{
  productTags: [
    'ojon',        'oil',
    'conditioner', 'shampoo',
    'treatment',   'serum',
    'rare blend',  'hydrating',
    'cleansing',   'texture'
  ]
}
```

#### Typeahead/AutoComplete Suggestions
The TypeAhead input searches against the name fields in the data file.  
I only displayed the image and names for the results container.   
I based the completion suggestion text off the first matching distinct tag.  

## FRONTEND
I made sure to stick with the approach you provided where we're using constructor and contained functions.  
I did end up adding functional components for search-input and product

The search function is called once 3 or more characters are entered.

I decided to create a custom component for SearchInput along with how the suggesstion text is rendered within the input.

I moved blocks of css around to keep it associated with the new components.

My goal was to mimic the example you provided as close as possible (UI/UX) 

Back [README.md](README.md)
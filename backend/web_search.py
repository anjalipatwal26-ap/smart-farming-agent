from ddgs import DDGS

def search_farming_info(query):
    """Web se real-time farming information search karo"""
    try:
        with DDGS() as ddgs:
            # Farming specific search
            search_query = f"India farming agriculture {query}"
            results = ddgs.text(search_query, max_results=3)
            
            if not results:
                return ""
            
            # Results combine karo
            web_context = ""
            for r in results:
                web_context += f"- {r['body']}\n"
            
            return web_context.strip()
            
    except Exception as e:
        return ""

# Test
if __name__ == "__main__":
    result = search_farming_info("tomato mandi price today India")
    print(result)
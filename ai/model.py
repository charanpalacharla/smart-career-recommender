def suggest_career(skills, interests):
    text = " ".join(skills).lower() + " " + interests.lower()
    if any(k in text for k in ["html","css","javascript","react","frontend"]):
        return "Frontend Developer"
    if any(k in text for k in ["node","express","backend","api"]):
        return "Backend Developer"
    if any(k in text for k in ["python","data","pandas"]):
        return "Data Analyst"
    return "Software Developer"

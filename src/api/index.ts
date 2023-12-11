import axios from "axios";
import { ROOT_URL } from "../helpers/constants";
import { Question, QuestionCategory } from "../types";


export async function getAllCategories(): Promise<QuestionCategory[]> {
  try {
    const response = await axios.get(`${ROOT_URL}/api_category.php`);

    if (!response.data || !response.data.trivia_categories) {
      throw new Error("Invalid response format");
    }

    const categories: QuestionCategory[] = response.data.trivia_categories.map((category: QuestionCategory) => ({
      id: category.id.toString(),
      name: category.name,
    }));

    return categories;
  } catch (error) {
    console.error("Error in getting categories:", error);
    throw error;
  }
}

export async function getCategorizedQuestions(amount: number, categoryID: number): Promise<Question[]> {
  try {
    const response = await axios.get(`${ROOT_URL}/api.php?amount=${amount}&category=${categoryID}`);

    if (!response.data || !response.data.results) {
      throw new Error('Invalid response format');
    }

    return response.data.results;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    throw error;
  }
}

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GenerateARFF {
	/*
	 * Main function for generating ARFF files required as input to our
	 * model classifier.
	 * This function generates a train ARFF and a test ARFF files from the input1.txt
	 * and input2.txt file provided as input
	 */
	public void generateARFF(String inputFile, String inputFile2) {
		FileReader fReader;
		BufferedReader bReader;
		FileWriter fWriter;
		BufferedWriter bWriter = null;
		HashSet<String> stopwords = getStopwords(GlobalMembers.stopwordFile);
		HashMap<String, String> addFeature = getAdditionFeature(inputFile2, stopwords);
		HashSet<String> category = new HashSet<String>();
		try{
			fReader = new FileReader(inputFile);
			bReader = new BufferedReader(fReader);
			//generating ARFF file for training data
			fWriter = new FileWriter(GlobalMembers.trainTemp);
			bWriter = new BufferedWriter(fWriter);
			String line = bReader.readLine();
			String[] lineArray = line.split("\t");
			//finding the number of rows to scan in input.txt
			Pattern p = Pattern.compile("(\\d+)");
			Matcher m = p.matcher(lineArray[0]);
			int numOfRowsTrain = 0;
			if (m.find()) {
				numOfRowsTrain = Integer.valueOf(m.group(1));
			}
			int i = 1;
			while(i <= numOfRowsTrain){
				line = bReader.readLine();
				String[] arr = line.split("\t");
				bWriter.write("\""+arr[2].toString()+"\"");
				bWriter.write(",");
				bWriter.write("\""+arr[1].toString()+"\"");
				bWriter.write(",");
				bWriter.write("\""+addFeature.get(arr[1])+"\"");
				bWriter.write(",");
				bWriter.write("\""+arr[0].toString()+"\"");
				bWriter.write("\n");
				category.add(arr[0]);
				i++;
			}
			bWriter.close();
			fWriter.close();
			finalizeARFF(GlobalMembers.trainTemp, category, 1, GlobalMembers.train);

			//generating ARFF file for test data
			fWriter = new FileWriter(GlobalMembers.testTemp);
			bWriter = new BufferedWriter(fWriter);
			line = bReader.readLine();
			lineArray = line.split("\t");
			Pattern p1 = Pattern.compile("(\\d+)");
			Matcher m1 = p1.matcher(lineArray[0]);
			int numOfRowsTest = 0;
			if (m1.find()) {
				numOfRowsTest = Integer.valueOf(m1.group(1));
			}
			int j = 1;
			while(j <= numOfRowsTest){
				line = bReader.readLine();
				String[] arr = line.split("\t");
				bWriter.write("\""+arr[1].toString()+"\"");
				bWriter.write(",");
				bWriter.write("\""+arr[0].toString()+"\"");
				bWriter.write(",");
				bWriter.write("\""+addFeature.get(arr[0].toString())+"\"");
				bWriter.write(",");
				bWriter.write("\""+"BIOLOGY"+"\"");
				bWriter.write("\n");
				j++;
			}
			bWriter.close();
			fWriter.close();
			finalizeARFF(GlobalMembers.testTemp, category, 1, GlobalMembers.test);

			bReader.close();
			fReader.close();
		}
		catch(IOException exp){
			exp.printStackTrace();
		}
		catch(Exception exp){
			exp.printStackTrace();
		}
	}

	/*
	 * Reading stopwords from file and storing them into a HashSet
	 */
	private HashSet<String> getStopwords(String stopwordFile) {
		HashSet<String> stopwords = new HashSet<String>();
		FileReader fReader;
		BufferedReader bReader;
		try{
			fReader = new FileReader(stopwordFile);
			bReader = new BufferedReader(fReader);
			String line = null;
			while((line = bReader.readLine()) != null){
				line = line.trim();
				stopwords.add(line);
			}
			bReader.close();
			fReader.close();
		}
		catch(Exception exp){
			exp.printStackTrace();
		}
		return stopwords;
	}
	
	/*
	 * Reading the addition feature file input2.txt and performing some text processing
	 * and returning a hashset where bookID is the key and feature is stored as value
	 */
	private HashMap<String, String> getAdditionFeature(String inputFile2, HashSet<String> stopwords) {
		HashMap<String, String> hm = new HashMap<String, String>();
		FileReader fReader;
		BufferedReader bReader;
		try{
			fReader = new FileReader(inputFile2);
			bReader = new BufferedReader(fReader);
			String line = bReader.readLine();
			String[] lineArray = line.split("\t");
			Pattern p = Pattern.compile("(\\d+)");
			Matcher m = p.matcher(lineArray[0]);
			int numOfRows = 0;
			if (m.find()) {
				numOfRows = Integer.valueOf(m.group(1));
			}
			int i = 0;
			while(i <= numOfRows){
				line = bReader.readLine();
				String[] arr = line.split("\t");
				if(arr.length >= 2){
					hm.put(arr[0].toString(), getContents(arr[1].toString(), stopwords));
				}
				//System.out.println(Arrays.toString(arr));
				i++;
			}
			bReader.close();
			fReader.close();
		}
		catch(Exception exp){
			exp.printStackTrace();
		}
		return hm;
	}

	/*
	 * Function for text processing before storing them into hashset
	 * We replace special characters and numbers, convert all text into
	 * lowercase
	 */
	private String getContents(String str, HashSet<String> stopwords) {
		StringBuilder result = new StringBuilder();
		str = str.replaceAll("[\\n]+", " ");
		str = str.replaceAll("[^a-zA-Z\\s]+", " ");
		String[] strArray = str.split(" ");
		for(int i = 0; i < strArray.length; i++){
			if(!stopwords.contains(strArray[i].toLowerCase())){
				result.append(strArray[i].toLowerCase()+" ");

			}
		}
		return result.toString(); 
	}

	/*
	 * Function for using intermediate files for actually generating the ARFF file
	 * which will be directly given as input to our classifier
	 */
	private void finalizeARFF(String input, HashSet<String> category, int flag, String output) {
		try{
			FileReader fReader = new FileReader(input);
			BufferedReader bReader = new BufferedReader(fReader);
			FileWriter fWriter = new FileWriter(output);
			BufferedWriter bWriter = new BufferedWriter(fWriter);
			bWriter.write("@relation booksClassification");
			bWriter.write("\n");
			bWriter.write("@attribute Name string");
			bWriter.write("\n");
			bWriter.write("@attribute BookID string");
			bWriter.write("\n");
			bWriter.write("@attribute BookContents string");
			bWriter.write("\n");
			bWriter.write("\n");
			if(flag == 1){
				bWriter.write("@attribute Class {");
				bWriter.write(writeCategories(category));
				bWriter.write("}");
				bWriter.write("\n");
			}
			bWriter.write("@data");
			bWriter.write("\n");
			String line = null;
			while((line = bReader.readLine()) != null){
				bWriter.write(line);
				bWriter.write("\n");
			}
			bWriter.flush();
			bReader.close();
			fReader.close();
			bWriter.close();
			fWriter.close();
		}
		catch(Exception exp){
			exp.printStackTrace();
		}
	}

	/*
	 * Function for writing categories available to the ARFF file
	 */
	private static String writeCategories(HashSet<String> category) {
		StringBuilder sb = new StringBuilder();
		for(String s : category){
			sb.append("'"+s+"'");
			sb.append(",");
		}
		return sb.toString();
	}

}

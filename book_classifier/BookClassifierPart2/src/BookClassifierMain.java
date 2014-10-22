import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;

import weka.classifiers.Classifier;
import weka.classifiers.bayes.NaiveBayes;
import weka.classifiers.trees.J48;
import weka.core.Instances;
import weka.filters.Filter;
import weka.filters.unsupervised.attribute.StringToWordVector;

public class BookClassifierMain {

	public static void main(String[] args) {
		GlobalMembers.inputFile1 = args[0];
		GlobalMembers.inputFile2 = args[1];
		GlobalMembers.classifierOption = Integer.parseInt(args[2]);
		GenerateARFF gARFF = new GenerateARFF();
		gARFF.generateARFF(GlobalMembers.inputFile1, GlobalMembers.inputFile2);
		performClassification();
		clearHelperFiles();
		System.out.println("Classification Complete");
	}

	/*
	 * Main function for taking train and test ARFF file, building the model
	 * and running the test instances on the model and performing classification
	 */
	private static void performClassification() {
		Classifier classifier;
		classifier = GlobalMembers.classifierOption == 1 ?  new NaiveBayes() : new J48();
		Instances filteredTrain;
		Instances filteredTest;
		StringToWordVector fil = new StringToWordVector();
		try{

			Instances instsTrain = new Instances(new FileReader("train.arff"));
			instsTrain.setClassIndex(instsTrain.numAttributes() - 1);
			fil.setInputFormat(instsTrain);
			filteredTrain = Filter.useFilter(instsTrain, fil);
			classifier.buildClassifier(filteredTrain);
			System.out.println("Training complete ");

			Instances instsTest = new Instances(new FileReader("test.arff"));
			instsTest.setClassIndex(instsTest.numAttributes() - 1);
			filteredTest = Filter.useFilter(instsTest, fil);

			Instances result = new Instances(instsTest);
			for(int i=0; i < filteredTest.numInstances(); i++){
				double predictedValue = classifier.classifyInstance(filteredTest.instance(i));// classify the  'i'th instance
				//System.out.println("Classification predicted value: "+predictedValue);
				result.instance(i).setClassValue(predictedValue);
			}
			writeResultToFile(result);
		}
		catch(Exception exp){
			exp.printStackTrace();	
		}
	}

	/*
	 * Function for writing the classified test instances to a file
	 */
	private static void writeResultToFile(Instances result) {
		FileWriter fWriter;
		BufferedWriter bWriter;
		try{
			fWriter = new FileWriter(GlobalMembers.outputFile);
			bWriter = new BufferedWriter(fWriter);
			bWriter.write("bookID\tpredictedLabel\n");
			for(int i = 0; i < result.numInstances(); i++){
				String temp = String.valueOf(result.get(i));
				String[] resArray = temp.split(",");
				bWriter.write(resArray[resArray.length-3]);
				bWriter.write("\t");
				bWriter.write(resArray[resArray.length-1].replaceAll("'", ""));
				bWriter.write("\n");
			}
			bWriter.flush();
			bWriter.close();
			fWriter.close();
		}
		catch(Exception exp){
			exp.printStackTrace();
		}
	}

	/*
	 * Function for cleaning up temporary files generated for performing
	 * classification
	 */
	private static void clearHelperFiles() {
		File t;
		try{
			t = new File(GlobalMembers.trainTemp);
			t.deleteOnExit();
			t = new File(GlobalMembers.testTemp);
			t.deleteOnExit();
			t = new File(GlobalMembers.train);
			t.deleteOnExit();
			t = new File(GlobalMembers.test);
			t.deleteOnExit();
		}
		catch(Exception exp){
			exp.printStackTrace();
		}
	}

}

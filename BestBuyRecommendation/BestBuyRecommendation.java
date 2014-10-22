

import java.io.IOException;
import java.util.HashSet;

/*
 * This is the MainClass file which calls other helper files for performing the Recommendation Tasks
 * 
 * - GenerateProductCSV.java is called to parse the XML file and generate a CSV file containing 
 * 		only those information which may be required for our recommendation system
 * 
 * - QueryPreProcessing.java is called for processing the the queries present in the train and test file and 
 * 		we get a modified version of both the files which contains the processed queries
 * 
 * - Stemmer.java is used of stemming the words, it takes individual words and returns back the word
 * 		after performing the stemming information 
 * 
 * - WordCleaner.java
 * 
 * - CheckQuerySimilarity.java
 * 
 * - QueryClustering.java
 */

public class BestBuyRecommendation {

	private String train, trainModified;
	private String test, testModified;
	private String productXML, productCSV;

	public BestBuyRecommendation(String train, String trainModified,
			String test, String testModfied, String productXML,
			String productCSV) {
		this.train = train;
		this.trainModified = trainModified;
		this.testModified = testModfied;
		this.test = test;
		this.productXML = productXML;
		this.productCSV = productCSV;
	}

	public void preProcessing() throws Exception {
		HashSet<String> prodWords = new HashSet<String>();

		/*
		 * Generating CSV file from XML file by selecting only the required
		 * information The Function returns back a list of all the words which
		 * are a part product This word list will help us in normalizing all the
		 * queries so that we can eliminate noise such as spelling mistakes and
		 * incomplete words that can be entered by user
		 */
		
		 GenerateProductCSV prod = new GenerateProductCSV(); prodWords =
		 prod.generateCSVFromXML(productXML, productCSV);
		 System.out.println("Completed generating CSV for Product");
		 
		 QueryPreProcessing qp = new QueryPreProcessing();
		 qp.preProcessQuery(train, trainModified, 3, prodWords);
		 System.out.println("Completed Processing Training Files");
		 qp.preProcessQuery(test, testModified, 2, prodWords);
		 System.out.println("Completed Processing Test Files");
	}

	public void performClustering() throws IOException {
		KMeanClustering km = new KMeanClustering();
		km.kMeanClustering();
		System.out.println("Completed Clustering for Product");
	}

	public void runRecommendation(String tfidfAnswers, String queryAnswers,
			String queryItemAnswers) throws Exception {
		TFIDF tfidf = new TFIDF();
		String args[] = { productXML, train, test, tfidfAnswers };
		tfidf.TFIDFAlog(args);
		System.out.println("TFIDF Done");
		Mapping m = new Mapping();
		String arguments[] = { trainModified, testModified, queryAnswers };
		m.QueryAlgo(arguments);
		System.out.println("Query collab Done");
		String argsH[] = { trainModified, testModified, productCSV,
				queryItemAnswers };
		ItemSim.calcQueries(argsH);
		System.out.println("Item collab Done");
	}

	public static void main(String[] args) throws Exception {
		long startTime = System.currentTimeMillis();
		String train = "xbox/train.csv";
		String trainModified = "xbox/train_modified.csv";
		String test = "xbox/test.csv";
		String testModified = "xbox/test_modified.csv";
		String tfidfAnswers = "xbox/tfidfAnswers.csv";
		String queryAnswers = "xbox/queryAnswers.csv";
		String productXML = "xbox/small_product_data.xml";
		String productCSV = "xbox/product.csv";
		String queryItemAnswers = "xbox/queryItemAnswers.csv";

		System.out.println("Full data");
		BestBuyRecommendation bbr = new BestBuyRecommendation(train,
				trainModified, test, testModified, productXML, productCSV);
		bbr.preProcessing();
		bbr.performClustering();
		bbr.runRecommendation(tfidfAnswers, queryAnswers, queryItemAnswers);
		
		train = "xbox/train_90.csv";
		test = "xbox/test_10.csv";
		String tfidfAnswers90 = "xbox/tfidfAnswers90.csv";
		String queryAnswers90 = "xbox/queryAnswers90.csv";
		String queryItemAnswers90 = "xbox/queryItemAnswers90.csv";

		System.out.println("9 Fold");
		BestBuyRecommendation bbr1 = new BestBuyRecommendation(train,
				trainModified, test, testModified, productXML, productCSV);
		bbr1.preProcessing();
		bbr1.performClustering();
		bbr1.runRecommendation(tfidfAnswers90, queryAnswers90, queryItemAnswers90);
		
		System.out.println("Starting Evaluation");
		Accuracy acc = new Accuracy();
		acc.accurate("TFIDF", tfidfAnswers90);
		acc.accurate("Query to Query", queryAnswers);
		acc.accurate("Item to Item", queryItemAnswers90);
		
		long endTime = System.currentTimeMillis();
		System.out.println("Time of execution in seconds = "
				+ (endTime - startTime) / 1000);
	}
}

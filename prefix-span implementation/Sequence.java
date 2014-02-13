

import java.util.ArrayList;
/*
 * A sequence consists of an arraylist of items, integer maintaining the number of items
 * within the sequence and the id for each of the sequence
 * We have provided the getter and setter methods for each property of the object 
 */
public class Sequence {
	private ArrayList<ItemSet> itemsets;
	private int numberOfItems;
	private int id;
	
	public Sequence(){
		this.itemsets = new ArrayList<ItemSet>();
		this.numberOfItems = 0;
		this.id = 0;
	}
	
	public Sequence(int id){
		this.id = id;
	}
	
	public int lenght(){
		return numberOfItems;
	}
	
	public void addItemSet(ItemSet itemset){
		this.itemsets.add(itemset);
		this.numberOfItems += itemset.size();
	}
	
	public int size(){
		return itemsets.size();
	}
	
	public int getId(){
		return this.id;
	}
	
	public void setId(int id){
		this.id = id;
	}
	
	public ArrayList<ItemSet> getItemsets(){
		return this.itemsets;
	}
	
	public void setItemsets(ArrayList<ItemSet> itemset){
		this.itemsets = itemset;
	}
	
	public void setCount(int count){
		this.numberOfItems = count;
	}
	
	public Integer getCount(){
		return this.numberOfItems;
	}
	
	public String displaySequence(){
		StringBuilder sb = new StringBuilder();
		//sb.append("<");
		for(ItemSet itemset : itemsets){
			sb.append(itemset.displayItemset());
		}
		//sb.append(">");
		return sb.toString();
	}
	
	public void remove(int index){
		itemsets.remove(index);
	}
}

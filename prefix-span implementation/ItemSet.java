
/*
 * Each itemset contains as arraylist of items
 * We have created the getter and setter methods for the arraylist
 * we have also created a function for returning the itemset as a string for
 * console printing
 */
import java.util.ArrayList;

public class ItemSet {
	private ArrayList<Item> items;
	Item it;
	
	public ItemSet(ArrayList<Item> allItems){
		this.items = allItems; 
	}
	
	public ItemSet(){
		items = new ArrayList<Item>();
	}
	
	public void addItem(Item value){
		this.items.add(value);
	}
	
	public void remove(Item value){
		this.items.remove(value);
	}
	
	public void setItems(ArrayList<Item> items){
		this.items = items;
	}
	
	public ArrayList<Item> getItems(){
		return this.items;
	}
	
	public String displayItemset(){
		StringBuilder sb = new StringBuilder();
		sb.append("(");
		for(int i = 0; i < items.size(); i++){
			sb.append(items.get(i).displayItem());
			if(i < items.size() - 1){
				sb.append(" ");
			}
		}
		sb.append(") ");
		return sb.toString();
	}

	public int size() {
		return items.size();
	}

}

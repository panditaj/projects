
/*
 * Each item holds an item value and its getter setter methods
 * We have created 2 constructors for setting the value of the item
 */
public class Item {
	private int itemNo;
	
	public Item(){
		this.itemNo = 0;
	}
	
	public Item(int itemNo){
		this.itemNo = itemNo;
	}
	
	public int getItemNo(){
		return this.itemNo;
	}
	
	public void setItemNo(int itemNo){
		this.itemNo = itemNo;
	}

	public int displayItem() {
		return getItemNo();
	}
}
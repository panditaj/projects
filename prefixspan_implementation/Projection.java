
/*
 * The projection object consists of 3 attributes the sequenceID, itemsetID, itemID 
 * and this stores information about the offset for a sequence when we are finding the
 * projected database for frequent patterns
 * We have provided the getter and setter methods for all the attributes
 * Also the toString methods has been overridden which is setting brackets for printing the pair
 */
public class Projection {

	private int sequenceID;
	private int itemsetID;
	private int itemID;
	
	public Projection(){
		this.sequenceID = 0;
		this.itemsetID = 0;
		this.itemID = 0;
	}
	
	public Projection(int sequenceID, int itemsetID, int itemID){
		this.sequenceID = sequenceID;
		this.itemsetID = itemsetID;
		this.itemID = itemID;
	}
	
	public int getSequenceID() {
		return sequenceID;
	}
	public void setSequenceID(int sequenceID) {
		this.sequenceID = sequenceID;
	}
	public int getItemsetID() {
		return itemsetID;
	}
	public void setItemsetID(int itemsetID) {
		this.itemsetID = itemsetID;
	}
	public int getItemID() {
		return itemID;
	}
	public void setItemID(int itemID) {
		this.itemID = itemID;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(sequenceID);
		sb.append(" ");
		sb.append(itemsetID);
		sb.append(" ");
		sb.append(itemID);
		return sb.toString();
	}

	
}

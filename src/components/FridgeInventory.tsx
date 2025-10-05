import { useState } from "react";
import { Header } from "./Header";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Trash2, Calendar, AlertTriangle, Search, Filter, Edit3 } from "lucide-react";
import fridgeImage from 'figma:asset/3185e1b2612184565e58b198ed0f1d24046ab303.png';
import pantryImage from 'figma:asset/a995d46dc90b794823ca1b1c768edb7a0dec436d.png';
import hippoImage from 'figma:asset/4bd14b305a485c40b997d6a69ae5ae1bf3d58009.png';


interface FridgeItem {
  id: number;
  name: string;
  category: string;
  quantity: string;
  unit: string;
  expiryDate: string;
  daysUntilExpiry: number;
}

interface FridgeInventoryProps {
  onNavigate: (page: "main" | "fridge" | "recipes" | "account") => void;
}

export function FridgeInventory({ onNavigate }: FridgeInventoryProps) {
  const [items, setItems] = useState<FridgeItem[]>([
    {
      id: 1,
      name: "Milk",
      category: "Fridge",
      quantity: "1",
      unit: "liter",
      expiryDate: "2024-10-10",
      daysUntilExpiry: 3
    },
    {
      id: 2,
      name: "Tomatoes",
      category: "Fridge",
      quantity: "5",
      unit: "pieces",
      expiryDate: "2024-10-08",
      daysUntilExpiry: 1
    },
    {
      id: 3,
      name: "Chicken Breast",
      category: "Fridge",
      quantity: "500",
      unit: "grams",
      expiryDate: "2024-10-12",
      daysUntilExpiry: 5
    },
    {
      id: 4,
      name: "Rice",
      category: "Pantry",
      quantity: "2",
      unit: "kg",
      expiryDate: "2025-03-15",
      daysUntilExpiry: 161
    },
    {
      id: 5,
      name: "Cheddar Cheese",
      category: "Fridge",
      quantity: "200",
      unit: "grams",
      expiryDate: "2024-10-20",
      daysUntilExpiry: 13
    },
    {
      id: 6,
      name: "Bananas",
      category: "Pantry",
      quantity: "6",
      unit: "pieces",
      expiryDate: "2024-10-09",
      daysUntilExpiry: 2
    },
    {
      id: 7,
      name: "Frozen Peas",
      category: "Freezer",
      quantity: "1",
      unit: "bag",
      expiryDate: "2025-01-15",
      daysUntilExpiry: 102
    },
    {
      id: 8,
      name: "Olive Oil",
      category: "Pantry",
      quantity: "500",
      unit: "ml",
      expiryDate: "2025-08-30",
      daysUntilExpiry: 329
    },
    {
      id: 9,
      name: "Greek Yogurt",
      category: "Fridge",
      quantity: "150",
      unit: "grams",
      expiryDate: "2024-10-14",
      daysUntilExpiry: 7
    },
    {
      id: 10,
      name: "Pasta",
      category: "Pantry",
      quantity: "500",
      unit: "grams",
      expiryDate: "2025-06-20",
      daysUntilExpiry: 258
    },
    {
      id: 11,
      name: "Bell Peppers",
      category: "Fridge",
      quantity: "3",
      unit: "pieces",
      expiryDate: "2024-10-11",
      daysUntilExpiry: 4
    },
    {
      id: 12,
      name: "Black Pepper",
      category: "Pantry",
      quantity: "50",
      unit: "grams",
      expiryDate: "2026-01-10",
      daysUntilExpiry: 462
    },
    {
      id: 13,
      name: "Orange Juice",
      category: "Fridge",
      quantity: "1",
      unit: "liter",
      expiryDate: "2024-10-09",
      daysUntilExpiry: 2
    },
    {
      id: 14,
      name: "Ground Beef",
      category: "Freezer",
      quantity: "1",
      unit: "kg",
      expiryDate: "2024-12-05",
      daysUntilExpiry: 61
    },
    {
      id: 15,
      name: "Honey",
      category: "Pantry",
      quantity: "250",
      unit: "ml",
      expiryDate: "2027-05-15",
      daysUntilExpiry: 952
    }
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    expiryDate: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FridgeItem | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");

  const categories = ["Fridge", "Pantry", "Freezer", "Vegetables", "Fruits", "Dairy", "Meat", "Grains", "Beverages", "Spices", "Other"];
  const units = ["pieces", "grams", "kg", "ml", "liter", "cups", "tbsp", "tsp"];

  const calculateDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.quantity && newItem.unit && newItem.expiryDate) {
      const daysUntilExpiry = calculateDaysUntilExpiry(newItem.expiryDate);
      const item: FridgeItem = {
        id: Date.now(),
        ...newItem,
        daysUntilExpiry
      };
      setItems([...items, item]);
      setNewItem({
        name: "",
        category: "",
        quantity: "",
        unit: "",
        expiryDate: ""
      });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    setDeleteItemId(null);
  };

  const handleEditItem = (item: FridgeItem) => {
    setEditingItem({
      ...item,
      expiryDate: item.expiryDate
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;
    
    const today = new Date();
    const expiry = new Date(editingItem.expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const updatedItem = {
      ...editingItem,
      daysUntilExpiry
    };
    
    setItems(items.map(item => 
      item.id === editingItem.id ? updatedItem : item
    ));
    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

  const getExpiryBadgeColor = (days: number) => {
    if (days < 0) return "destructive";
    if (days <= 2) return "destructive";
    if (days <= 5) return "secondary";
    return "default";
  };

  const getExpiryText = (days: number) => {
    if (days < 0) return `Expired ${Math.abs(days)} days ago`;
    if (days === 0) return "Expires today";
    if (days === 1) return "Expires tomorrow";
    return `Expires in ${days} days`;
  };

  // Filter and sort items
  const filteredAndSortedItems = items
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === "all" || item.category.toLowerCase() === filterBy.toLowerCase();
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "expiry":
          return a.daysUntilExpiry - b.daysUntilExpiry;
        case "quantity":
          return parseInt(a.quantity) - parseInt(b.quantity);
        default:
          return 0;
      }
    });

  const expiringSoon = items.filter(item => item.daysUntilExpiry <= 3 && item.daysUntilExpiry >= 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="fridge" onNavigate={onNavigate} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Kitchen Inventory</h1>
            <p className="text-xl text-gray-600">Hungry hippos love a full pantry… and a well-managed one</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#8BC34A] hover:bg-[#7CB342] text-white px-6 py-3 rounded-full text-lg">
                <Plus className="h-5 w-5 mr-2" />
                Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Item to Kitchen</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="e.g., Milk, Tomatoes"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Storage Location</Label>
                  <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Where is this stored?" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={newItem.unit} onValueChange={(value) => setNewItem({ ...newItem, unit: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    type="date"
                    value={newItem.expiryDate}
                    onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                  />
                </div>

                <Button onClick={handleAddItem} className="w-full bg-[#8BC34A] hover:bg-[#7CB342]">
                  Add Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Item Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Item</DialogTitle>
              </DialogHeader>
              {editingItem && (
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="edit-name">Item Name</Label>
                    <Input
                      id="edit-name"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      placeholder="e.g., Milk, Tomatoes"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-category">Storage Location</Label>
                    <Select value={editingItem.category} onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Where is this stored?" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="edit-quantity">Quantity</Label>
                      <Input
                        id="edit-quantity"
                        value={editingItem.quantity}
                        onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-unit">Unit</Label>
                      <Select value={editingItem.unit} onValueChange={(value) => setEditingItem({ ...editingItem, unit: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="edit-expiry">Expiry Date</Label>
                    <Input
                      id="edit-expiry"
                      type="date"
                      value={editingItem.expiryDate}
                      onChange={(e) => setEditingItem({ ...editingItem, expiryDate: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsEditDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleUpdateItem} 
                      className="flex-1 bg-[#8BC34A] hover:bg-[#7CB342]"
                    >
                      Update Item
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search by item name or storage location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="category">Storage Location</SelectItem>
                <SelectItem value="expiry">Expiry Date</SelectItem>
                <SelectItem value="quantity">Quantity</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40">
                <Filter className="h-5 w-4 mr-2" />
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <img src={hippoImage} alt="All Items" className="w-5 h-4 object-contain" />
                    All Items
                  </div>
                </SelectItem>
                <SelectItem value="fridge">Fridge</SelectItem>
                <SelectItem value="pantry">Pantry</SelectItem>
                <SelectItem value="freezer">Freezer</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="meat">Meat</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="spices">Spices</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Results Info */}
        {(searchTerm || filterBy !== "all") && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredAndSortedItems.length} of {items.length} items
            {searchTerm && ` matching "${searchTerm}"`}
            {filterBy !== "all" && ` in ${filterBy}`}
          </div>
        )}

        {/* Expiring Soon Alert */}
        {expiringSoon.length > 0 && (
          <Card className="p-4 mb-6 border-orange-200 bg-orange-50">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-orange-900">Items Expiring Soon</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {expiringSoon.map((item) => (
                <Badge key={item.id} variant="destructive">
                  {item.name} - {getExpiryText(item.daysUntilExpiry)}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedItems.map((item) => (
            <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditItem(item)}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Item</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{item.name}" from your inventory? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteItem(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{item.quantity} {item.unit}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Expiry:
                  </span>
                  <Badge variant={getExpiryBadgeColor(item.daysUntilExpiry)}>
                    {getExpiryText(item.daysUntilExpiry)}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredAndSortedItems.length === 0 && items.length > 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterBy("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="flex justify-center gap-8 mb-8">
              <img src={fridgeImage} alt="Empty fridge" className="w-24 h-32 object-contain" />
              <img src={pantryImage} alt="Empty pantry" className="w-24 h-32 object-contain" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your kitchen is empty</h3>
            <p className="text-gray-600 mb-4">Start adding items to your fridge and pantry</p>
            <Button 
              className="bg-[#8BC34A] hover:bg-[#7CB342]"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Item
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
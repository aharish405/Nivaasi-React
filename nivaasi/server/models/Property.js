import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
  bedId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Notice', 'Blocked'],
    default: 'Available'
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    default: null
  }
});

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  beds: [bedSchema]
});

const floorSchema = new mongoose.Schema({
  floorName: {
    type: String,
    required: true
  },
  rooms: [roomSchema]
});

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  floors: [floorSchema]
}, {
  timestamps: true
});

// Virtual for total beds count
propertySchema.virtual('totalBeds').get(function() {
  let total = 0;
  this.floors.forEach(floor => {
    floor.rooms.forEach(room => {
      total += room.beds.length;
    });
  });
  return total;
});

// Virtual for available beds count
propertySchema.virtual('availableBeds').get(function() {
  let available = 0;
  this.floors.forEach(floor => {
    floor.rooms.forEach(room => {
      room.beds.forEach(bed => {
        if (bed.status === 'Available') available++;
      });
    });
  });
  return available;
});

// Virtual for occupied beds count
propertySchema.virtual('occupiedBeds').get(function() {
  let occupied = 0;
  this.floors.forEach(floor => {
    floor.rooms.forEach(room => {
      room.beds.forEach(bed => {
        if (bed.status === 'Occupied') occupied++;
      });
    });
  });
  return occupied;
});

// Ensure virtuals are included in JSON
propertySchema.set('toJSON', { virtuals: true });
propertySchema.set('toObject', { virtuals: true });

const Property = mongoose.model('Property', propertySchema);

export default Property;

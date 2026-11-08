import type { ProjectExtras } from './types';

// Fictional project details for a fictional studio (VIZAM concept). Names, coordinates, distances and figures are invented
// and are shown on the site labelled as fictional concept data.
export const projectDetails: Record<string, ProjectExtras> = {
  'halden-house': {
    architects: ['Lena Marsk', 'Tiago Varela'],
    tags: ['Cast in place', 'One sheltered lawn', 'Three offset volumes'],
    coordinates: '38.7981° N, 9.3876° W',
    context: {
      lead: 'Three cast volumes, a folded timber stair, a guest wing and a studio, arranged around one lawn that every room looks onto.',
      stats: [
        { value: '180', unit: 'm', caption: 'to the old village market' },
        { value: '412', unit: 'm²', caption: 'of floor over three levels' },
        { value: '3', unit: 'km', caption: 'to the nearest beach' },
      ],
      rows: [
        { title: 'Light', lines: [{ label: 'Morning rooms', value: 'Bedrooms, east' }, { label: 'Evening rooms', value: 'Living, west' }, { label: 'Bath slot', value: 'One per bathroom' }] },
        { title: 'Materials', lines: [{ label: 'Board-marked concrete', value: 'Walls and soffits' }, { label: 'Oiled oak', value: 'Stair and floors' }, { label: 'Basalt', value: 'Terrace' }] },
        { title: 'Landscape', lines: [{ label: 'Lawn', value: '420 m²' }, { label: 'Cork oaks', value: '9 retained' }, { label: 'Rain tank', value: '30 m³' }] },
      ],
    },
  },
  'lumen-rooms': {
    architects: ['Sofia Brandt', 'Rui Esteves'],
    tags: ['Adaptive reuse', 'Three courtyards', 'Daylight corridors'],
    coordinates: '38.3793° N, 8.7866° W',
    context: {
      lead: 'Twenty-four rooms and three suites in a former cannery shed, with a lobby, a dining room, a spa and a courtyard pool.',
      stats: [
        { value: '90', unit: 'm', caption: 'to the dune path' },
        { value: '24', unit: 'rooms', caption: 'and 3 suites' },
        { value: '12', unit: 'min', caption: 'on foot to the village' },
      ],
      rows: [
        { title: 'Light', lines: [{ label: 'Roof light wells', value: '7' }, { label: 'Corridors ending in daylight', value: 'All' }, { label: 'Pool lighting', value: 'From below' }] },
        { title: 'Materials', lines: [{ label: 'Lime plaster', value: 'Lobby and rooms' }, { label: 'Travertine', value: 'Bathrooms' }, { label: 'Woven rush', value: 'Ceilings and lamps' }] },
        { title: 'Landscape', lines: [{ label: 'Courtyards', value: '3' }, { label: 'Pines', value: '40 planted' }, { label: 'Sand garden', value: '600 m²' }] },
      ],
    },
  },
  'saline-pavilion': {
    architects: ['Marta Quintela', 'Jonas Ekberg'],
    tags: ['Raised on a plinth', 'Folded white roof', 'Lit stair to the sky'],
    coordinates: '40.6405° N, 8.7338° W',
    context: {
      lead: 'A gallery, an archive, a learning room and a roof terrace, raised on a table of concrete above the seasonal tide.',
      stats: [
        { value: '250', unit: 'm', caption: 'to the salt-pan boardwalk' },
        { value: '1,240', unit: 'm²', caption: 'of galleries and archive' },
        { value: '40', unit: 'cm', caption: 'clearance above flood level' },
      ],
      rows: [
        { title: 'Light', lines: [{ label: 'Roof light', value: 'North, diffuse' }, { label: 'Stair', value: 'Hidden line of light' }, { label: 'Sunken court', value: 'Open to the sky' }] },
        { title: 'Materials', lines: [{ label: 'White concrete', value: 'Plinth and shell' }, { label: 'Salt-glazed tile', value: 'Court floor' }, { label: 'Cork', value: 'Gallery floors' }] },
        { title: 'Landscape', lines: [{ label: 'Salt pans', value: 'Retained' }, { label: 'Boardwalk', value: '320 m' }, { label: 'Marsh planting', value: 'Native species' }] },
      ],
    },
  },
  'casa-velo': {
    architects: ['Inês Calado', 'Mateus Roque'],
    tags: ['Walls before windows', 'Rammed earth', 'One long axis'],
    coordinates: '38.5667° N, 7.9078° W',
    context: {
      lead: 'A long, low holiday house of white walls: three bedrooms, a kitchen to live in, a courtyard and a pool on one axis.',
      stats: [
        { value: '400', unit: 'm', caption: 'to the cork-oak track' },
        { value: '236', unit: 'm²', caption: 'on a single storey' },
        { value: '6', unit: '°C', caption: 'cooler indoors in summer' },
      ],
      rows: [
        { title: 'Light', lines: [{ label: 'Kitchen', value: 'Courtyard, south' }, { label: 'Bedrooms', value: 'Screened, east' }, { label: 'Walls', value: 'Shade each other' }] },
        { title: 'Materials', lines: [{ label: 'Rammed earth', value: 'Structure' }, { label: 'Lime render', value: 'All walls' }, { label: 'Terracotta', value: 'Courtyard floor' }] },
        { title: 'Landscape', lines: [{ label: 'Pool', value: '12 m' }, { label: 'Olive trees', value: '14' }, { label: 'Rainwater', value: 'Garden supply' }] },
      ],
    },
  },
  'northfold-works': {
    architects: ['Vera Lindqvist', 'Duarte Faria'],
    tags: ['Column grid as plan', 'Light by the north', 'Low-carbon fit-out'],
    coordinates: '41.1496° N, 8.6109° W',
    context: {
      lead: 'Desks in bays of eight, meeting rooms facing north, a long kitchen table, and plants and curtains that let the floor change.',
      stats: [
        { value: '300', unit: 'm', caption: 'to the metro platform' },
        { value: '110', unit: 'desks', caption: 'across five bays' },
        { value: '1,680', unit: 'm²', caption: 'of open floor' },
      ],
      rows: [
        { title: 'Light', lines: [{ label: 'Meeting rooms', value: 'North, even light' }, { label: 'Desk bays', value: 'Beside windows' }, { label: 'Lamps', value: 'Task only' }] },
        { title: 'Materials', lines: [{ label: 'Polished screed', value: 'Original slab' }, { label: 'Birch plywood', value: 'Tables, shelves' }, { label: 'Wool felt', value: 'Curtains, panels' }] },
        { title: 'Landscape', lines: [{ label: 'Plants', value: '120 indoors' }, { label: 'Roof garden', value: '90 m²' }, { label: 'Bike store', value: '40 places' }] },
      ],
    },
  },
  'olive-court-house': {
    architects: ['Clara Mendonça', 'Axel Nordin'],
    tags: ['Shade first', 'Pale travertine', 'Olive grove terrace'],
    coordinates: '38.0153° N, 7.8650° W',
    context: {
      lead: 'Offset stone volumes around a shaded court: a main house, a guest room and a covered terrace that opens to the grove.',
      stats: [
        { value: '120', unit: 'm', caption: 'to the grove boundary' },
        { value: '318', unit: 'm²', caption: 'of house and terraces' },
        { value: '60', unit: 'olives', caption: 'kept on the plot' },
      ],
      rows: [
        { title: 'Light', lines: [{ label: 'Deep reveals', value: 'Summer shade' }, { label: 'Glazing', value: 'Oak-framed' }, { label: 'Court', value: 'Soft west light' }] },
        { title: 'Materials', lines: [{ label: 'Travertine', value: 'Walls and floors' }, { label: 'Lime plaster', value: 'Interiors' }, { label: 'Oak', value: 'Frames' }] },
        { title: 'Landscape', lines: [{ label: 'Olive grove', value: 'Retained' }, { label: 'Terrace', value: '85 m²' }, { label: 'Cistern', value: 'Garden supply' }] },
      ],
    },
  },
  'mar-de-cal': {
    architects: ['Helena Soares', 'Oskar Vinter'],
    tags: ['Curved lime plaster', 'Arched passage', 'Horizon terrace'],
    coordinates: '37.1020° N, 8.9967° W',
    context: {
      lead: 'A sequence of sheltered thresholds from cool rooms to an open terrace, with a low roof and a parapet that follows the horizon.',
      stats: [
        { value: '70', unit: 'm', caption: 'to the cliff path' },
        { value: '364', unit: 'm²', caption: 'of house and terrace' },
        { value: '1', unit: 'arch', caption: 'between shade and sky' },
      ],
      rows: [
        { title: 'Light', lines: [{ label: 'Arched passage', value: 'Filters sea glare' }, { label: 'Terrace', value: 'Open, south-west' }, { label: 'Rooms', value: 'Shaded, cool' }] },
        { title: 'Materials', lines: [{ label: 'Lime plaster', value: 'Curved walls' }, { label: 'Limestone', value: 'Terrace' }, { label: 'Terracotta', value: 'Pots, tiles' }] },
        { title: 'Landscape', lines: [{ label: 'Coastal planting', value: 'Salt-tolerant' }, { label: 'Terrace pots', value: '24' }, { label: 'Path', value: 'To the cliff edge' }] },
      ],
    },
  },
  'mira-residence': {
    architects: ['Beatriz Camacho', 'Emil Sørensen'],
    tags: ['Outdoor rooms', 'Limestone piers', 'Open shared entrance'],
    coordinates: '38.7223° N, 9.1393° W',
    context: {
      lead: 'Apartments with deep planted loggias, a shared courtyard and an entrance that stays open to the street.',
      stats: [
        { value: '150', unit: 'm', caption: 'to the tram stop' },
        { value: '1,420', unit: 'm²', caption: 'across six floors' },
        { value: '2', unit: 'm', caption: 'depth of every loggia' },
      ],
      rows: [
        { title: 'Light', lines: [{ label: 'Loggias', value: 'Temper direct sun' }, { label: 'Timber screens', value: 'Adjustable' }, { label: 'Courtyard', value: 'Borrowed daylight' }] },
        { title: 'Materials', lines: [{ label: 'Limestone', value: 'Piers and base' }, { label: 'Oak', value: 'Screens' }, { label: 'Bronze', value: 'Window frames' }] },
        { title: 'Landscape', lines: [{ label: 'Planted edges', value: 'Every balcony' }, { label: 'Courtyard', value: '180 m²' }, { label: 'Street trees', value: '6 new' }] },
      ],
    },
  },
  'mire-apartment': {
    architects: ['Amélia Torres', 'Nils Haugen'],
    tags: ['Keep the shell', 'One long room', 'Soft edges'],
    coordinates: '38.7139° N, 9.1334° W',
  },
  'ombra-townhouse': {
    architects: ['Karen Dahl', 'Pedro Alvim'],
    tags: ['Honest repairs', 'Cast and polished', 'One gallery wall'],
    coordinates: '55.6761° N, 12.5683° E',
  },
  'kiln-yard-studios': {
    architects: ['Rosa Valente', 'Anders Holm'],
    tags: ['Workshop first', 'Retained brick', 'Rain-fed green wall'],
    coordinates: '41.5454° N, 8.4265° W',
  },
};

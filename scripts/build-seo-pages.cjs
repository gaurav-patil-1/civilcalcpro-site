/* Build static, SEO-optimized engineering category hub pages for civilcalcpro.com */
const fs = require('node:fs');
const path = require('node:path');

const REPO_ROOT = path.resolve(__dirname, '..');
const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.leestudios.civilcalcpro';
const CSS_HREF = '/assets/styles.css?v=seo-20261118';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const HUBS = [
  {
    slug: 'calculators',
    navKey: 'calculators',
    breadcrumbName: 'All Calculators',
    kicker: 'COMPLETE DIRECTORY · 320+ OFFLINE TOOLS',
    h1Main: 'Civil Engineering & Construction Calculators',
    h1Italic: '320+ site tools in one offline app.',
    title:
      '320+ Civil Engineering & Construction Calculators - CivilCalc Pro App',
    description:
      'Browse all 320+ offline civil engineering and construction calculators in CivilCalc Pro: concrete volume, RCC & steel weight (BBS), brickwork, plaster, tiles, electrical sizing, BOQs, and unit converters.',
    lead:
      'CivilCalc Pro organizes more than 320 field-ready calculators across concrete, structural steel & RCC, masonry & finishes, earthwork, formwork, electrical sizing, geometry, and unit conversions-running 100% offline on Android.',
    asideTitle: 'Why Engineers Use CivilCalc Pro',
    asideText:
      'Every calculator supports metric (mm, cm, m) and imperial (in, ft, ft/in) dimensions, editable wastage, custom mix defaults, saved project BOQs, and clean PDF or CSV exports.',
    sections: [
      {
        id: 'disciplines',
        kicker: 'SEVEN CORE DISCIPLINES',
        heading: 'Explore calculators by engineering category.',
        intro:
          'Select any discipline below to inspect the specific structural members, formulas, material outputs, and field workflows included in CivilCalc Pro.',
        cards: [
          {
            code: 'CON / 60+ TOOLS',
            title: 'Concrete & Staircase Calculators',
            href: '/concrete-calculators/',
            text:
              'Wet and dry concrete volume (1.54 factor), cement bags, sand, aggregate, water, and admixture take-offs for columns, footings, slabs, beams, staircases, culverts, and concrete roads.',
            chips: ['M15–M30 Mix', 'Columns & Footings', 'Staircases', 'Cement Bags'],
          },
          {
            code: 'RCC / 55+ TOOLS',
            title: 'Steel Weight, RCC & Bar Bending (BBS)',
            href: '/rcc-steel-calculators/',
            text:
              'Rebar unit weight (D²/162), slab/beam/column/footing reinforcement schedules, stirrup cutting lengths, spiral bars, lap & development length, cover blocks, and structural steel profiles.',
            chips: ['D²/162 Steel', 'Slab & Beam BBS', 'Stirrups & Rings', 'Lap Length'],
          },
          {
            code: 'QTY / 145+ TOOLS',
            title: 'Brickwork, Finishes, Earthwork & BOQ',
            href: '/quantity-boq-calculators/',
            text:
              'Clay brick & AAC block masonry, mortar ratios, plaster, putty/primer/paint, tile & granite flooring, roofing, excavation & backfill, shuttering area, tanks, and multi-item project BOQs.',
            chips: ['Brick & Block', 'Plaster & Tiles', 'Earthwork', 'PDF & CSV BOQ'],
          },
          {
            code: 'ELC / 32+ TOOLS',
            title: 'Site & Building Electrical Sizing',
            href: '/electrical-calculators/',
            text:
              'Single-phase & 3-phase cable sizing, voltage drop percentage, MCB/MCCB breaker sizing, RCD/RCCB selection, fault level, busbars, motor FLC, kVAr capacitor banks, and conduit fill.',
            chips: ['Cable & V-Drop', 'MCB / MCCB / RCD', 'Motor FLC', 'PFC kVAr'],
          },
          {
            code: 'GEO / 26+ TOOLS',
            title: 'Plot Area, Tank Volume & Unit Converters',
            href: '/area-volume-conversion/',
            text:
              'Irregular plot & land area, built-up area, rectangular/cylindrical/frustum water tank volumes, compound feet-inches (ft/in) math, CFT to CUM, brass conversions, and material densities.',
            chips: ['Plot Area', 'Sump & Tank Volume', 'ft/in ↔ m', 'CFT · CUM · Brass'],
          },
          {
            code: 'BOQ / PROJECT WORKFLOW',
            title: 'Saved Site Projects & PDF/CSV Reports',
            href: '/quantity-boq-calculators/#boq-reports',
            text:
              'Combine concrete, steel, masonry, finishes, and labour items under named projects to produce consolidated material schedules, cost summaries, and shareable PDF or CSV files.',
            chips: ['Material Totals', 'Custom Rates', '25 Languages', 'Offline Storage'],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Are all 320+ calculators available offline on construction sites?',
        a: 'Yes. Every calculation engine runs locally on your Android phone with zero internet dependency, so you can estimate concrete, steel, masonry, and electrical loads in basements or remote sites.',
      },
      {
        q: 'Can I switch between feet-inches (ft/in) and metric (mm, m) on any input?',
        a: 'Yes. Length, span, thickness, spacing, and diameter inputs support mm, cm, m, in, ft, and compound ft/in, converting seamlessly without manual unit math.',
      },
      {
        q: 'How does CivilCalc Pro handle wastage and custom material rates?',
        a: 'Each quantity calculator exposes editable wastage percentages, dry-volume multipliers, cement bag weights, and optional unit prices so your project BOQ reflects real local procurement rates.',
      },
    ],
  },
  {
    slug: 'concrete-calculators',
    navKey: 'concrete',
    breadcrumbName: 'Concrete Calculators',
    kicker: 'CONCRETE & STAIRCASES · 60+ FIELD CALCULATORS',
    h1Main: 'Concrete Volume & Mix Ratio Calculators',
    h1Italic: 'Columns, footings, slabs, beams & stairs.',
    title:
      'Concrete Calculator - Cement, Sand, Aggregate, Column, Footing & Slab | CivilCalc Pro',
    description:
      'Calculate wet and dry concrete volume (1.54 factor), cement bags, sand, aggregate, and water for columns, trapezoidal & stepped footings, slabs, beams, staircases, culverts, and concrete roads in CivilCalc Pro.',
    lead:
      'From standard rectangular slabs to L-shaped columns, trapezoidal combined footings, and dog-legged staircases, CivilCalc Pro computes exact wet volume, dry mortar/concrete volume, cement bag counts, sand, coarse aggregate, water, and cost in seconds.',
    asideTitle: 'Standard Site Assumptions Built In',
    asideText:
      'Supports nominal mixes (M10, M15, M20, M25) and custom mix ratios, editable dry-volume factor (default 1.54), configurable cement bag weight (e.g. 50 kg), wastage percentage, and CFT/CUM/Brass outputs.',
    sections: [
      {
        id: 'columns-footings',
        kicker: 'SUBSTRUCTURE & VERTICAL MEMBERS',
        heading: 'Column & footing concrete calculators.',
        intro:
          'Dimensioned diagrams guide every geometric measurement so irregular pedestals, stepped pads, and combined footings are estimated without manual prismoidal mistakes.',
        cards: [
          {
            code: 'COL / 01',
            title: 'Rectangular, Square & Circular Columns',
            text:
              'Compute concrete volume, cement bags, sand, and aggregate across multiple identical columns with clear height, diameter/width, wastage, and mix grade controls.',
            chips: ['Square & Rectangular', 'Circular Pier', 'Multi-Column Count'],
          },
          {
            code: 'COL / 02',
            title: 'L-Shaped, T-Shaped, Cross (+) & C-Shaped Columns',
            text:
              'Dedicated flange-and-web geometry calculators for corner L-columns, T-junctions, cruciform columns, channel cores, hollow box columns, and custom cross-section areas.',
            chips: ['L & T Columns', 'Cross (+) Column', 'Hollow Box Column'],
          },
          {
            code: 'FTG / 03',
            title: 'Isolated Box, Trapezoidal & Stepped Footings',
            text:
              'Exact frustum/prismoidal concrete volume for sloped trapezoidal footings, single- and two-stepped footings, circular pads, triangular pads, and connected pad footings.',
            chips: ['Trapezoidal Frustum', 'Stepped Footing', 'Combined Footing'],
          },
        ],
      },
      {
        id: 'slabs-beams',
        kicker: 'SUPERSTRUCTURE & INFRASTRUCTURE',
        heading: 'Slabs, beams, staircases & civil concrete.',
        intro:
          'Handle residential floors, sloped roofs, stepped beams, site drainage, and rigid pavements with consistent material breakdowns.',
        cards: [
          {
            code: 'SLB / 04',
            title: 'Flat Slab, One-Way/Two-Way & Sloping Slab Concrete',
            text:
              'Calculate slab concrete volume with opening deductions, variable or sloped thickness, haunches, and instant cement-sand-aggregate schedules.',
            chips: ['Flat & Sloped Slab', 'Opening Deductions', 'Mix Breakdown'],
          },
          {
            code: 'BEM / 05',
            title: 'Rectangular, T/L, Sloping & Stepped Beams',
            text:
              'Estimate plinth beams, floor beams, lintels, sloped rafters, and stepped beams with repeatable member counts and project BOQ saving.',
            chips: ['Plinth & Floor Beams', 'Sloping Beam', 'Stepped Beam'],
          },
          {
            code: 'STR / 06',
            title: 'Straight, Dog-Legged, L-Shaped & Open-Well Staircases',
            id: 'staircases',
            text:
              'Automatic waist-slab, riser-tread step triangles, and mid-landing concrete summation for straight, dog-legged, quarter-turn, and open-well stairs.',
            chips: ['Waist Slab + Steps', 'Dog-Legged Stair', 'Open-Well & Landing'],
          },
          {
            code: 'INF / 07',
            title: 'Shear Walls, Retaining Walls, Culverts & Concrete Roads',
            text:
              'Heavy civil concrete take-offs for box culverts, concrete tubes/pipes, roadside gutters, curb stones, shear walls, and PQC concrete pavements.',
            chips: ['Box Culvert', 'Curb & Gutter', 'Concrete Road / PQC'],
          },
          {
            code: 'LAB / 08',
            title: 'Concrete Strength by Age & Water-Cement Checks',
            text:
              'Estimate concrete compressive strength gain across curing ages (3, 7, 14, 28 days) alongside water-cement ratio and batching weights.',
            chips: ['7 & 28-Day Strength', 'w/c Ratio', 'Batch Weights'],
          },
          {
            code: 'BOQ / 09',
            title: 'Consolidate All Concrete Members Into One BOQ',
            text:
              'Save footings, columns, beams, slabs, and stairs under one project to view total cement bags, cubic metres/CFT/brass of sand and aggregate, and export PDF/CSV.',
            chips: ['Project Aggregation', 'PDF & CSV Export', 'Rate Costing'],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'How is dry concrete volume calculated from wet volume?',
        a: 'CivilCalc Pro multiplies net wet concrete volume (plus optional wastage) by the dry-volume factor-1.54 by default to account for voids in sand and coarse aggregate-and divides by the sum of mix proportions to compute cement, sand, and aggregate quantities.',
      },
      {
        q: 'Does the trapezoidal footing calculator use the exact frustum formula?',
        a: 'Yes. Sloped/trapezoidal footings sum the rectangular base cuboid with the exact prismoidal/frustum wedge volume H/6 × [A1 + A2 + 4·Am] (or equivalent exact cross-sectional integration) rather than crude average-area approximations.',
      },
      {
        q: 'Can I change cement bag weight and mix proportions?',
        a: 'Yes. Standard grades (such as 1:1.5:3 for M20 or 1:1:2 for M25) as well as custom ratios and bag weights (50 kg, 40 kg, 25 kg, or 94 lb) can be customized per calculation or saved in Defaults.',
      },
    ],
  },
  {
    slug: 'rcc-steel-calculators',
    navKey: 'rcc',
    breadcrumbName: 'Steel & RCC Calculators',
    kicker: 'REINFORCEMENT & STRUCTURAL STEEL · 55+ TOOLS',
    h1Main: 'Steel Weight, RCC & Bar Bending (BBS) Calculators',
    h1Italic: 'Rebar take-offs, stirrups, laps & profiles.',
    title:
      'Steel Weight Calculator (D²/162), Bar Bending Schedule (BBS) & RCC Steel | CivilCalc Pro',
    description:
      'Calculate rebar weight (D²/162), slab/beam/column/footing reinforcement, stirrup & ring cutting length, spiral steel, lap & development length, cover blocks, and structural metal weights in CivilCalc Pro.',
    lead:
      'Built for site engineers and bar benders: compute cutting lengths, bend deductions, hook allowances, bar counts, diameter-wise steel weights (kg & tonnes), and structural steel section weights with clear reinforcement diagrams.',
    asideTitle: 'Precision Rebar Detailing',
    asideText:
      'Every reinforcement screen labels bar diameters, clear cover, c/c spacing, hooks, cranks, and lap zones directly on an engineering diagram so site measurements match structural drawings.',
    sections: [
      {
        id: 'reinforcement',
        kicker: 'MEMBER REINFORCEMENT TAKE-OFFS',
        heading: 'Slab, beam, column & footing steel calculators.',
        intro:
          'Generate diameter-wise bar counts, cutting lengths, and total steel weight for standard and advanced multi-layer RCC members.',
        cards: [
          {
            code: 'SLB / 01',
            title: 'One-Way, Two-Way & Diagram-Specific Slab Steel',
            text:
              'Main bars, distribution steel, cranked/bent-up bars, top extra support bars, chair bars, and spacing-to-count schedules with wastage and rate costing.',
            chips: ['Main & Distribution', 'Cranked Bars', 'Top Extra Steel'],
          },
          {
            code: 'COL / 02',
            title: 'Column Vertical Bars & Multi-Tie Configurations',
            text:
              '4-bar to 14+ bar rectangular and circular column reinforcement take-offs with starter/lap allowances, master rings, inner diamond/cross ties, and spiral links.',
            chips: ['Vertical Longitudinal', 'Master + Inner Ties', '12+ Column Layouts'],
          },
          {
            code: 'BEM / 03',
            title: 'Beam Main Steel, Extra Bars & Stirrup Zones',
            text:
              'Bottom tension bars, top anchor bars, curtailment/extra support bars, side-face bars, and multi-zone shear stirrups across 10+ reference beam arrangements.',
            chips: ['Top & Bottom Bars', 'Curtailment Steel', 'Shear Stirrups'],
          },
          {
            code: 'FTG / 04',
            title: 'Isolated & Combined Footing Mesh Reinforcement',
            text:
              'Bottom and double-mesh footing reinforcement along X and Y directions with L-bends, clear cover deductions, and diameter-wise weight summaries.',
            chips: ['Single & Double Mesh', 'Cover Deduction', 'L-Bend Development'],
          },
          {
            code: 'RCC / 05',
            title: 'RCC Quick Structural & Safety Code Checks',
            text:
              'On-site sanity checks for slab thickness, beam/column steel ratios, minimum/maximum reinforcement percentages, and cover compliance.',
            chips: ['Min/Max Steel %', 'RCC Quick Checks', 'Code Sanity Check'],
          },
          {
            code: 'WGT / 06',
            title: 'Rebar Unit Weight & Bundle Calculator (D²/162)',
            text:
              'Instant weight per metre, per foot, per bar, and per bundle for 6 mm, 8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm, 32 mm, and custom bar diameters.',
            chips: ['D²/162.2 kg/m', '6 mm – 40 mm Bars', 'Pieces ↔ Tonnes'],
          },
        ],
      },
      {
        id: 'stirrups-laps',
        kicker: 'CUTTING LENGTHS & STRUCTURAL METAL',
        heading: 'Stirrups, spirals, laps & structural steel profiles.',
        intro:
          'Eliminate manual cutting-length errors for rings, helices, splices, and fabricated steel sections.',
        cards: [
          {
            code: 'RNG / 07',
            title: 'Square, Rectangular, Circular & Helical Stirrups',
            text:
              'Exact cutting length with clear cover deduction, 90°/135° seismic hook lengths (10d / 12d), 45°/90°/135° bend deductions, and spiral pitch geometry.',
            chips: ['135° Seismic Hooks', 'Bend Deductions', 'Helix / Pile Spiral'],
          },
          {
            code: 'LAP / 08',
            title: 'Lap Length, Development Length (Ld) & Cover Blocks',
            text:
              'Compute tension and compression lap/development lengths by concrete grade and steel yield strength (Fe415, Fe500, Fe550), plus spacer/cover-block counts.',
            chips: ['Tension & Comp. Lap', 'Development Length Ld', 'Cover Block Count'],
          },
          {
            code: 'MTL / 09',
            title: 'Structural Steel & Metal Section Weight Calculators',
            id: 'metal-weights',
            text:
              'Weight and cost calculators for MS plates, round/square/hex bars, hollow pipes & RHS/SHS tubes, equal/unequal L-angles, C-channels, I/H beams, and T-sections.',
            chips: ['I-Beam & Channel', 'RHS / SHS / Pipe', 'MS Plate & Angle'],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What formula does CivilCalc Pro use for steel bar weight?',
        a: 'For steel density 7850 kg/m³, cross-sectional area π·D²/4 gives unit weight D² / 162.28 kg/m (commonly written D²/162 where D is bar diameter in mm). You can also customize material density for stainless steel, aluminium, brass, or copper.',
      },
      {
        q: 'Are hook lengths and bend deductions included in stirrup cutting length?',
        a: 'Yes. Column and beam ring calculators deduct concrete cover to the bar centreline/outer face, add configurable hook lengths, and apply 90° and 135° bend deductions so bar benders get accurate cut lengths.',
      },
      {
        q: 'Can I combine steel weights across multiple diameters in one project?',
        a: 'Yes. Saving slab, beam, column, and footing steel calculations into a CivilCalc Pro project aggregates total steel requirements alongside concrete and formwork in a unified BOQ.',
      },
    ],
  },
  {
    slug: 'quantity-boq-calculators',
    navKey: 'boq',
    breadcrumbName: 'Quantity, Masonry & BOQ',
    kicker: 'QUANTITY SURVEYING & BOQ · 145+ TOOLS',
    h1Main: 'Brickwork, Plaster, Finishes, Earthwork & BOQ App',
    h1Italic: 'Material take-offs to PDF & CSV reports.',
    title:
      'BOQ & Quantity Calculator - Brickwork, Plaster, Tiles, Paint, Earthwork & Formwork | CivilCalc Pro',
    description:
      'Estimate clay bricks, AAC blocks, mortar cement & sand, plastering, wall putty, paint, tile & marble flooring, roofing, excavation earthwork, shuttering area, and project BOQ PDF/CSV reports in CivilCalc Pro.',
    lead:
      'Turn room, wall, and trench dimensions into exact material purchase lists and priced Bills of Quantities-covering masonry, interior finishes, earthwork, shuttering, tanks, and site infrastructure.',
    asideTitle: 'From Single Wall to Full Project BOQ',
    asideText:
      'Deduct doors, windows, and lintels automatically; apply local brick dimensions, mortar joint thickness, and wastage; then export itemized PDF or CSV schedules.',
    sections: [
      {
        id: 'masonry-plaster',
        kicker: 'WALLS, MORTAR & SURFACE FINISHES',
        heading: 'Masonry, plastering, flooring & paint calculators.',
        intro:
          'Accurate unit counts and dry mortar breakdowns with full support for custom brick/block sizes and opening deductions.',
        cards: [
          {
            code: 'MSN / 01',
            title: 'Clay Brick, Fly-Ash & AAC / Hollow Block Masonry',
            text:
              'Straight walls, L-walls, C-walls, rectangular inspection chambers, arched-door walls, and volume-based brickwork with mortar ratio (1:4, 1:5, 1:6), cement bags, and sand.',
            chips: ['Brick & AAC Block', 'Door/Window Deduction', 'Mortar Cement & Sand'],
          },
          {
            code: 'PLS / 02',
            title: 'Internal, External & Ceiling Plaster Calculators',
            text:
              '12 mm, 15 mm, 20 mm, or custom plaster thickness with uneven-surface allowance, wastage, dry mortar factor, cement bags, and plaster sand volume.',
            chips: ['12 mm / 15 mm / 20 mm', 'Cement & Plaster Sand', 'Opening Deductions'],
          },
          {
            code: 'FLR / 03',
            title: 'Floor & Wall Tiles, Marble, Granite & Paver Blocks',
            id: 'flooring-paint',
            text:
              'Tile count, box count, skirting length, bedding mortar or tile adhesive bags, grout quantity, and wastage for rooms, bathrooms, stairs, and outdoor paving.',
            chips: ['Tiles & Skirting', 'Adhesive & Grout', 'Marble / Pavers'],
          },
          {
            code: 'PNT / 04',
            title: 'Wall Putty, Primer & Interior/Exterior Paint',
            text:
              'Multi-coat coverage calculators for wall putty (kg), primer (litres), emulsion/weatherproof paint, and texture finishes with door/window deductions.',
            chips: ['Putty · Primer · Paint', 'Multi-Coat Coverage', 'Net Paintable Area'],
          },
        ],
      },
      {
        id: 'earthwork-formwork',
        kicker: 'SITEWORK, SHUTTERING & PROJECT BOQ',
        heading: 'Earthwork, formwork, tanks & BOQ reporting.',
        intro:
          'Plan excavation equipment trips, shuttering plywood sheets, waterproofing areas, and consolidated client quotations.',
        cards: [
          {
            code: 'ETH / 05',
            title: 'Pit, Trench, Sloped Excavation & Backfill Earthwork',
            text:
              'Cut volume, battered/sloped trench excavation, soil swell/bulking factor for truck trips, compacted backfill volume, sand filling, and boulder soling.',
            chips: ['Sloped Excavation', 'Swell & Bulking', 'Backfill & Sand Fill'],
          },
          {
            code: 'FMW / 06',
            title: 'Column, Beam, Slab, Footing & Wall Formwork (Shuttering)',
            text:
              'Contact shuttering area (m² / ft²), plywood sheet counts, battens/runners, props, shuttering oil, and tie-rod estimates for RCC members.',
            chips: ['Contact Area m²/ft²', 'Plywood & Props', 'Beam/Column/Slab'],
          },
          {
            code: 'TNK / 07',
            title: 'Underground Sump, Overhead Tank, Septic & Swimming Pools',
            text:
              'Capacity in litres/gallons plus wall, base slab, cover slab, plaster, and waterproofing material quantities for rectangular and circular tanks.',
            chips: ['Capacity in Litres', 'Sump & Overhead Tank', 'Swimming Pools'],
          },
          {
            code: 'ROF / 08',
            title: 'Gable, Hip, Shed & Corrugated Sheet Roofing',
            text:
              'True pitched roof slope area from plan dimensions and pitch/rise, roofing sheet overlap counts, ridge caps, purlins, and truss geometry.',
            chips: ['Gable & Hip Roof', 'Slope Factor', 'Sheet & Purlin Count'],
          },
          {
            code: 'BOQ / 09',
            title: 'Multi-Item Project BOQ, Cost Summary & PDF/CSV Export',
            id: 'boq-reports',
            text:
              'Organize every saved calculation by project, attach material and labour unit rates, review consolidated quantities (total bags, sand, steel, bricks), and share clean PDF or CSV reports.',
            chips: ['Consolidated Totals', 'PDF Report Branding', 'Spreadsheet CSV'],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I customize brick dimensions and mortar joint thickness?',
        a: 'Yes. Whether your region uses modular bricks (190 × 90 × 90 mm), traditional bricks (230 × 110 × 75 mm), US modular bricks, or 600 × 200 mm AAC blocks, you can set exact unit dimensions and joint thickness.',
      },
      {
        q: 'What formats can CivilCalc Pro export for client or procurement sharing?',
        a: 'CivilCalc Pro exports formatted PDF project & BOQ reports for clients/supervisors as well as structured CSV files that open directly in Excel or Google Sheets.',
      },
      {
        q: 'Does project data stay private on my phone?',
        a: 'Yes. Saved projects, rates, and BOQs are stored locally on your device by default, with optional user-controlled backup to your own Google Drive.',
      },
    ],
  },
  {
    slug: 'electrical-calculators',
    navKey: 'electrical',
    breadcrumbName: 'Electrical Calculators',
    kicker: 'SITE & BUILDING ELECTRICAL · 32+ MEP TOOLS',
    h1Main: 'Construction & Building Electrical Calculators',
    h1Italic: 'Cable sizing, voltage drop, breakers & motors.',
    title:
      'Electrical Calculator App - Cable Sizing, Voltage Drop, MCB/MCCB, RCD & Motor FLC | CivilCalc Pro',
    description:
      '32+ offline electrical and MEP calculators in CivilCalc Pro: 1-phase & 3-phase cable sizing, voltage drop, MCB/MCCB breaker sizing, RCD/RCCB selection, fault level, busbars, motor FLC, and kVAr power factor correction.',
    lead:
      'Civil engineers, MEP coordinators, and site electricians get a complete electrical design & verification suite inside the same offline app-covering wiring, protection switchgear, motors, power factor, conduits, and site lighting.',
    asideTitle: 'Built for MEP & Site Engineers',
    asideText:
      'Supports copper and aluminium conductors, single-phase and three-phase AC/DC systems, installation derating factors, IEC/standard breaker & cable tables, and clear single-line diagrams.',
    sections: [
      {
        id: 'cables-voltage-drop',
        kicker: 'CIRCUITS, CABLES & CONDUITS',
        heading: 'Cable sizing, voltage drop & conduit calculators.',
        intro:
          'Size feeders and sub-circuits accurately for both current-carrying capacity (ampacity) and permissible voltage drop limits.',
        cards: [
          {
            code: 'CBL / 01',
            title: 'Single-Phase & Three-Phase Cable Sizing',
            text:
              'Select copper or aluminium conductor cross-section (mm² / AWG) accounting for load kW/kVA/Amps, power factor, ambient temperature, grouping, and installation method.',
            chips: ['Cu & Al Conductors', 'Derating Factors', '1Ø & 3Ø Feeders'],
          },
          {
            code: 'VDP / 02',
            title: 'Voltage Drop & Maximum Cable Run Length',
            text:
              'Compute exact resistive and reactive (R·cosφ + X·sinφ) voltage drop in Volts and %, and verify compliance against lighting (3%) and power (5%) limits.',
            chips: ['% Voltage Drop', 'R & X Impedance', 'Max Feeder Length'],
          },
          {
            code: 'CND / 03',
            title: 'Conduit Fill, Cable Tray & Trunking Sizing',
            text:
              'Calculate total cable outer-diameter area and select PVC/GI conduit or tray dimensions within allowable space-factor fill percentages.',
            chips: ['Conduit Fill %', 'Cable Tray Width', 'Multi-Cable Runs'],
          },
        ],
      },
      {
        id: 'protection-switchgear',
        kicker: 'PROTECTION, SWITCHGEAR & MOTORS',
        heading: 'Breakers, RCDs, fault level, motors & kVAr.',
        intro:
          'Coordinate protective devices, panel busbars, motor branch circuits, and capacitor banks directly on site.',
        cards: [
          {
            code: 'BRK / 04',
            title: 'MCB, MCCB & ACB Breaker Sizing (Ib ≤ In ≤ Iz)',
            text:
              'Match design current, standard breaker trip ratings, B/C/D trip curves, and cable ampacity coordination (`Ib ≤ In ≤ Iz`) for distribution boards and feeders.',
            chips: ['Ib ≤ In ≤ Iz Check', 'B / C / D Curves', 'MCB · MCCB · ACB'],
          },
          {
            code: 'RCD / 05',
            title: 'RCD / RCCB Selection & Discrimination Check',
            text:
              'Choose residual current sensitivity (30 mA, 100 mA, 300 mA), AC/A/F/B type, S-type time-delayed upstream selectivity, and upstream-downstream breaker discrimination.',
            chips: ['30–300 mA RCCB', 'Type AC / A / F / B', 'Selectivity Check'],
          },
          {
            code: 'FLT / 06',
            title: 'Short-Circuit Fault Level (Isc) & Busbar Sizing',
            text:
              'Estimate prospective 3-phase and earth-fault kA from transformer kVA/%Z and feeder impedance, and size copper/aluminium panel busbars for continuous & thermal fault ratings.',
            chips: ['Prospective Isc (kA)', 'Adiabatic k²S²', 'Cu / Al Busbar'],
          },
          {
            code: 'MTR / 07',
            title: 'Motor Full-Load Current (FLC), Branch Circuit & Overload',
            id: 'motors-pfc',
            text:
              'Compute kW/HP motor FLC, DOL vs Star-Delta starter currents, overload relay range, fuse/breaker sizing, and pump/fan shaft & motor power.',
            chips: ['Motor FLC (kW / HP)', 'Overload & Fuse', 'Pump & Fan Power'],
          },
          {
            code: 'PFC / 08',
            title: 'Power Factor Correction (PFC) Capacitor Bank Sizing',
            text:
              'Calculate required reactive power (kVAr), capacitor current, detuned reactor options, and kVA demand reduction to lift lagging cosφ to target (e.g. 0.95–0.99).',
            chips: ['Required kVAr', 'cosφ Improvement', 'kVA Demand Saving'],
          },
          {
            code: 'LGT / 09',
            title: 'Indoor Lumen Lighting, Load Schedule & Backup Sizing',
            text:
              'Room lux/lumen fixture count, diversity load estimation, kVA-kW-Amps conversions, earthing checks, and inverter/generator backup sizing.',
            chips: ['Lumen Method Lux', 'kW ↔ kVA ↔ Amps', 'DG & UPS Backup'],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Does CivilCalc Pro check both ampacity and voltage drop when sizing cables?',
        a: 'Yes. Cable sizing tools evaluate derated current-carrying capacity alongside voltage drop limits so long site feeders are not undersized.',
      },
      {
        q: 'Are protection coordination checks like Ib ≤ In ≤ Iz included?',
        a: 'Yes. The Breaker Sizing, RCD/RCCB Selection, Discrimination Check, and Fault Level calculators verify load current, protective device rating, cable thermal withstand, and breaking capacity (Icu/Ics) together.',
      },
    ],
  },
  {
    slug: 'area-volume-conversion',
    navKey: 'conversion',
    breadcrumbName: 'Area, Volume & Unit Converters',
    kicker: 'GEOMETRY & SITE CONVERSIONS · 26+ TOOLS',
    h1Main: 'Plot Area, Tank Volume & Civil Unit Converters',
    h1Italic: 'ft/in, sq ft, CFT, CUM, brass & densities.',
    title:
      'Plot Area Calculator, Tank Volume & Construction Unit Converter (ft/in, CFT, CUM, Brass) | CivilCalc Pro',
    description:
      'Calculate land & irregular plot area, water tank volumes, feet-inches (ft/in) dimensions, CFT to CUM, sand/aggregate brass conversions, and material volume-to-weight in CivilCalc Pro.',
    lead:
      'Stop switching between generic phone calculators and conversion charts: measure irregular plots, compute tank capacities in litres, and convert site units (`ft/in`, `CFT`, `CUM`, `Brass`, `Sq Ft`, `Sq M`, `Acres`) offline.',
    asideTitle: 'Built for Mixed-Unit Drawings',
    asideText:
      'Architectural drawings often arrive in feet-inches while structural schedules use millimetres and BOQs bill in cubic metres-CivilCalc Pro bridges every unit cleanly.',
    sections: [
      {
        id: 'plot-area',
        kicker: 'LAND, PLOT & GEOMETRIC AREA',
        heading: 'Plot & surface area calculators.',
        intro:
          'Accurate 2D area and perimeter tools for site plots, floor plates, road cross-sections, and architectural openings.',
        cards: [
          {
            code: 'ARA / 01',
            title: 'Rectangular, Triangular (Heron) & Irregular Quadrilateral Plots',
            text:
              'Measure four-sided irregular site plots using side lengths and diagonal triangulation, outputting sq ft, sq m, sq yd (gaj), acres, hectares, guntha, cent, and bigha.',
            chips: ['Irregular 4-Side Plot', 'Heron Triangulation', 'Sq Ft · Sq M · Acre'],
          },
          {
            code: 'ARA / 02',
            title: 'Circle, Sector, Segment, Ellipse, Trapezoid & Polygon Area',
            text:
              'Fast geometric area and perimeter calculators for curved balconies, arches, circular slabs, Regular polygons, L-shapes, and compound rooms.',
            chips: ['Circle & Sector', 'Trapezoid & L-Shape', 'Perimeter & Area'],
          },
          {
            code: 'VOL / 03',
            title: 'Tank, Cylinder, Frustum Cone, Prism & Sphere Volume',
            id: 'tank-volume',
            text:
              'Calculate net geometric volume in m³, ft³, and litres/gallons for underground sumps, cylindrical silos, hopper cones, trenches, and partial tank fill levels.',
            chips: ['m³ · ft³ · Litres', 'Hopper / Frustum', 'Cylinder & Rectangular'],
          },
        ],
      },
      {
        id: 'unit-converters',
        kicker: 'CONSTRUCTION UNIT CONVERSIONS',
        heading: 'Engineering & material density converters.',
        intro:
          'Purpose-built converters tuned to construction procurement and structural calculations.',
        cards: [
          {
            code: 'CNV / 04',
            title: 'Length & Feet-Inches (ft/in) ↔ Metric (mm, cm, m)',
            text:
              'Convert compound feet-and-inches measurements directly to decimal feet, inches, millimetres, centimetres, and metres without rounding mistakes.',
            chips: ['ft/in ↔ mm & m', 'Decimal Feet', 'Site Tape Friendly'],
          },
          {
            code: 'CNV / 05',
            title: 'Volume & Quarry Units: CFT ↔ CUM ↔ Brass ↔ Litres',
            text:
              'Instant conversions between cubic feet (CFT), cubic metres (CUM, 1 m³ = 35.3147 ft³), 100-CFT Brass for sand and aggregate trucks, US gallons, and litres.',
            chips: ['1 Brass = 100 CFT', '1 CUM = 35.315 CFT', 'Litres & Gallons'],
          },
          {
            code: 'CNV / 06',
            title: 'Material Bulk Density: Volume ↔ Weight (Tonnes / kg)',
            text:
              'Convert loose or compacted volumes of cement, river sand, M-sand, 10 mm / 20 mm aggregate, soil, bitumen, brick, and steel directly into kg and metric tonnes.',
            chips: ['Sand & Aggregate Tonnes', 'Bulk Density Presets', 'Pressure · Force · Area'],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'How many CFT and CUM are in 1 Brass of sand or aggregate?',
        a: '1 Brass equals 100 cubic feet (100 CFT), which converts to approximately 2.8317 cubic metres (CUM). CivilCalc Pro converts between Brass, CFT, CUM, and metric tonnes instantly.',
      },
      {
        q: 'How do you measure an irregular 4-sided land plot accurately?',
        a: 'Measure all four boundary sides plus at least one diagonal on site. CivilCalc Pro splits the quadrilateral into two triangles using Heron’s formula to give the exact plot area-avoiding the classic average-opposite-sides error.',
      },
    ],
  },
];

function renderHubPage(hub) {
  const canonicalUrl = `https://civilcalcpro.com/${hub.slug}/`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement:
      hub.slug === 'calculators'
        ? [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'CivilCalc Pro',
              item: 'https://civilcalcpro.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: hub.breadcrumbName,
              item: canonicalUrl,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'CivilCalc Pro',
              item: 'https://civilcalcpro.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Calculators',
              item: 'https://civilcalcpro.com/calculators/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: hub.breadcrumbName,
              item: canonicalUrl,
            },
          ],
  };

  const allCards = hub.sections.flatMap((s) => s.cards);
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: hub.h1Main,
    description: hub.description,
    url: canonicalUrl,
    numberOfItems: allCards.length,
    itemListElement: allCards.map((card, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: card.title,
      description: card.text,
      ...(card.href ? { url: `https://civilcalcpro.com${card.href}` } : {}),
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hub.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  const otherHubs = HUBS.filter((h) => h.slug !== hub.slug).slice(0, 3);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <script>
      (function () {
        var root = document.documentElement;
        try {
          var saved = localStorage.getItem("ccp_theme");
          if (saved !== "light" && saved !== "dark") {
            saved = window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light";
          }
          root.dataset.theme = saved;
        } catch (_) {
          root.dataset.theme = "light";
        }
      })();
    </script>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover"
    />
    <title>${escapeHtml(hub.title)}</title>
    <meta name="description" content="${escapeHtml(hub.description)}" />
    <meta
      name="robots"
      content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
    />
    <meta name="theme-color" content="#f1efe7" />
    <meta name="application-name" content="CivilCalc Pro" />
    <meta name="apple-mobile-web-app-title" content="CivilCalc Pro" />
    <meta name="author" content="Lee Studios" />

    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="canonical" href="${canonicalUrl}" />

    <meta property="og:site_name" content="CivilCalc Pro" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(hub.title)}" />
    <meta property="og:description" content="${escapeHtml(hub.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="https://civilcalcpro.com/og-banner.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta
      property="og:image:alt"
      content="CivilCalc Pro - ${escapeHtml(hub.breadcrumbName)}"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(hub.title)}" />
    <meta name="twitter:description" content="${escapeHtml(hub.description)}" />
    <meta name="twitter:image" content="https://civilcalcpro.com/og-banner.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&amp;family=DM+Mono:wght@400;500&amp;family=Instrument+Serif:ital@0;1&amp;display=swap"
    />
    <link rel="stylesheet" href="${CSS_HREF}" />

    <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 6)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(itemListSchema, null, 6)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 6)}
    </script>
  </head>

  <body>
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="/" aria-label="CivilCalc Pro home">
          <span class="brand-mark">
            <img
              src="/public/images/adaptive-icon.png"
              width="128"
              height="128"
              alt="CivilCalc Pro"
            />
          </span>
          <span class="brand-name">CivilCalc Pro</span>
        </a>

        <nav class="nav-links" aria-label="Primary navigation">
          <a${hub.navKey === 'calculators' ? ' class="active"' : ''} href="/calculators/">Calculators</a>
          <a${hub.navKey === 'concrete' ? ' class="active"' : ''} href="/concrete-calculators/">Concrete</a>
          <a${hub.navKey === 'rcc' ? ' class="active"' : ''} href="/rcc-steel-calculators/">Steel &amp; RCC</a>
          <a${hub.navKey === 'boq' ? ' class="active"' : ''} href="/quantity-boq-calculators/">BOQ &amp; Quantity</a>
          <a${hub.navKey === 'electrical' ? ' class="active"' : ''} href="/electrical-calculators/">Electrical</a>
          <a${hub.navKey === 'conversion' ? ' class="active"' : ''} href="/area-volume-conversion/">Area &amp; Units</a>
        </nav>

        <div class="nav-right">
          <a
            class="header-cta"
            href="${PLAY_URL}"
            rel="noopener noreferrer"
          >
            Get the app <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            class="theme-toggle"
            data-theme-toggle
            aria-label="Switch to dark theme"
            title="Toggle color theme"
          >
            <span class="theme-symbol" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </header>

    <main id="main">
      <section class="hub-hero">
        <div class="container">
          <nav aria-label="Breadcrumb">
            <ol class="breadcrumbs">
              <li><a href="/">CivilCalc Pro</a></li>
              ${
                hub.slug === 'calculators'
                  ? `<li aria-hidden="true">/</li><li>${escapeHtml(hub.breadcrumbName)}</li>`
                  : `<li aria-hidden="true">/</li><li><a href="/calculators/">Calculators</a></li><li aria-hidden="true">/</li><li>${escapeHtml(hub.breadcrumbName)}</li>`
              }
            </ol>
          </nav>

          <div class="hub-hero-inner">
            <div>
              <p class="coordinate">${escapeHtml(hub.kicker)}</p>
              <h1>
                ${escapeHtml(hub.h1Main)}
                <em>${escapeHtml(hub.h1Italic)}</em>
              </h1>
              <p class="lead">${escapeHtml(hub.lead)}</p>
              <div class="hero-actions" style="margin-top: 2rem">
                <a
                  class="store-button"
                  href="${PLAY_URL}"
                  rel="noopener noreferrer"
                  aria-label="Get CivilCalc Pro on Google Play"
                >
                  <span class="play-mark" aria-hidden="true"></span>
                  <span>
                    <small>Download on</small>
                    <strong>Google Play</strong>
                  </span>
                </a>
                <a class="button-secondary" href="/">
                  Back to CivilCalc Pro Overview
                </a>
              </div>
            </div>

            <aside class="hub-aside" aria-label="Field capability summary">
              <h2>${escapeHtml(hub.asideTitle)}</h2>
              <p>${escapeHtml(hub.asideText)}</p>
              <ul class="chip-row">
                <li class="chip">Offline Android App</li>
                <li class="chip">mm · m · ft · ft/in</li>
                <li class="chip">PDF &amp; CSV BOQ</li>
                <li class="chip">25 Languages</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

${hub.sections
  .map(
    (sec) => `      <section class="hub-section" id="${sec.id}" aria-labelledby="${sec.id}-title">
        <div class="container">
          <div class="hub-section-head">
            <p class="coordinate">${escapeHtml(sec.kicker)}</p>
            <h2 id="${sec.id}-title">${escapeHtml(sec.heading)}</h2>
            <p>${escapeHtml(sec.intro)}</p>
          </div>

          <div class="calc-grid">
${sec.cards
  .map(
    (card) => `            <article class="calc-card"${card.id ? ` id="${card.id}"` : ''}>
              <div>
                <span class="calc-card-code">${escapeHtml(card.code)}</span>
                <h3>${
                  card.href
                    ? `<a href="${card.href}">${escapeHtml(card.title)} ↗</a>`
                    : escapeHtml(card.title)
                }</h3>
                <p>${escapeHtml(card.text)}</p>
              </div>
              <ul class="chip-row">
${card.chips.map((c) => `                <li class="chip">${escapeHtml(c)}</li>`).join('\n')}
              </ul>
            </article>`,
  )
  .join('\n')}
          </div>
        </div>
      </section>`,
  )
  .join('\n\n')}

      <section class="faq-section section" aria-labelledby="hub-faq-title">
        <div class="container faq-grid">
          <div class="faq-heading">
            <p class="coordinate">COMMON QUESTIONS</p>
            <h2 id="hub-faq-title">Field FAQ.</h2>
            <p>
              Need support or want to request a calculator? Email
              <a href="mailto:support@civilcalcpro.com">support@civilcalcpro.com</a>.
            </p>
          </div>

          <div class="faq">
${hub.faqs
  .map(
    (f) => `            <details>
              <summary>${escapeHtml(f.q)}</summary>
              <p>${escapeHtml(f.a)}</p>
            </details>`,
  )
  .join('\n')}
          </div>
        </div>
      </section>

      <section class="hub-section" aria-label="Related calculator categories">
        <div class="container">
          <div class="hub-section-head">
            <p class="coordinate">MORE IN CIVILCALC PRO</p>
            <h2>Explore related calculator suites.</h2>
          </div>
          <div class="hub-nav-strip">
${otherHubs
  .map(
    (other) => `            <a class="hub-nav-card" href="/${other.slug}/">
              <small>${escapeHtml(other.kicker)}</small>
              <strong>${escapeHtml(other.breadcrumbName)} ↗</strong>
            </a>`,
  )
  .join('\n')}
          </div>
        </div>
      </section>

      <section class="final-cta" aria-labelledby="hub-cta-title">
        <div class="container cta-grid">
          <div class="cta-marker" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <div class="cta-copy">
            <p class="coordinate coordinate--light">RUN ALL 320+ TOOLS ON SITE</p>
            <h2 id="hub-cta-title">
              Get CivilCalc Pro
              <em>on your phone.</em>
            </h2>
          </div>
          <div class="cta-action">
            <p>Free to install on Android. Works offline with no mandatory account.</p>
            <a
              class="store-button store-button--light"
              href="${PLAY_URL}"
              rel="noopener noreferrer"
              aria-label="Get CivilCalc Pro on Google Play"
            >
              <span class="play-mark" aria-hidden="true"></span>
              <span>
                <small>Download on</small>
                <strong>Google Play</strong>
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container footer-grid footer-grid--four">
        <div class="footer-card footer-card--brand">
          <div class="footer-brand">
            <span class="brand-mark">
              <img
                src="/public/images/adaptive-icon.png"
                width="128"
                height="128"
                alt="CivilCalc Pro"
              />
            </span>
            <span>CivilCalc Pro</span>
          </div>
          <p>
            Offline-first Android toolkit for civil engineering calculators,
            construction estimates, RCC &amp; steel take-offs, project BOQs, and
            PDF/CSV reports.
          </p>
        </div>
        <div class="footer-card">
          <h2>Calculator hubs</h2>
          <ul class="list-tight">
            <li><a href="/calculators/">All 320+ Calculators</a></li>
            <li><a href="/concrete-calculators/">Concrete &amp; Staircases</a></li>
            <li><a href="/rcc-steel-calculators/">Steel, RCC &amp; BBS</a></li>
            <li><a href="/quantity-boq-calculators/">Quantity, Masonry &amp; BOQ</a></li>
            <li><a href="/electrical-calculators/">Electrical &amp; MEP</a></li>
            <li><a href="/area-volume-conversion/">Area, Volume &amp; Units</a></li>
          </ul>
        </div>
        <div class="footer-card">
          <h2>App &amp; workflow</h2>
          <ul class="list-tight">
            <li><a href="/">CivilCalc Pro Home</a></li>
            <li><a href="/#workflow">Project &amp; BOQ Workflow</a></li>
            <li><a href="/#calculators">Discipline Breakdown</a></li>
            <li><a href="${PLAY_URL}" rel="noopener noreferrer">Download on Google Play</a></li>
          </ul>
        </div>
        <div class="footer-card">
          <h2>Legal &amp; support</h2>
          <ul class="list-tight">
            <li><a href="/privacy/">Privacy Policy</a></li>
            <li><a href="/terms/">Terms of Service</a></li>
            <li><a href="mailto:support@civilcalcpro.com">Email support</a></li>
            <li><a href="/app-ads.txt">app-ads.txt</a></li>
          </ul>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>&copy; <span id="year">2026</span> CivilCalc Pro · Lee Studios.</p>
        <p class="footer-note">Designed for the field. Built with care.</p>
        <div class="meta-links">
          <a href="/">Home</a>
          <a href="/calculators/">Calculators</a>
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
        </div>
      </div>
    </footer>

    <script>
      (function () {
        var el = document.getElementById("year");
        if (el) el.textContent = new Date().getFullYear();

        function apply(theme) {
          document.documentElement.dataset.theme = theme;
          var meta = document.querySelector('meta[name="theme-color"]');
          if (meta) meta.setAttribute("content", theme === "light" ? "#f1efe7" : "#0a100d");
          document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
            b.setAttribute(
              "aria-label",
              theme === "light" ? "Switch to dark theme" : "Switch to light theme",
            );
          });
          try {
            localStorage.setItem("ccp_theme", theme);
          } catch (_) {}
        }

        document.addEventListener("click", function (e) {
          var btn = e.target.closest("[data-theme-toggle]");
          if (!btn) return;
          apply(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
        });

        apply(document.documentElement.dataset.theme || "light");
      })();
    </script>

    <script
      defer
      src="https://portalstage.catchpoint.com/jp/203816/latest/InitialLoadScript.js"
    ></script>
  </body>
</html>
`;
}

for (const hub of HUBS) {
  const dir = path.join(REPO_ROOT, hub.slug);
  fs.mkdirSync(dir, { recursive: true });
  const outPath = path.join(dir, 'index.html');
  fs.writeFileSync(outPath, renderHubPage(hub), 'utf8');
  console.log(`Generated ${outPath}`);
}

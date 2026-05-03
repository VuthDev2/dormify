# Dormify Modal System - Implementation Guide

## 📋 Overview

A clean, professional modal system that displays content in the center of the screen when any button is clicked. All buttons are now functional with their own dedicated UI components.

## 🎯 How It Works

### 1. **Modal Context** (`/contexts/modal-context.tsx`)
- Manages global modal state
- Provides `useModal()` hook for accessing modal functions
- `openModal()` - Opens modal with content
- `closeModal()` - Closes modal

### 2. **Modal Component** (`/components/modal.tsx`)
- Beautiful animated modal with backdrop blur
- Smooth entrance/exit animations
- Supports multiple size options: `sm`, `md`, `lg`, `xl`, `full`
- Close button and backdrop click to dismiss

### 3. **Modal Content Components** (`/components/modal-contents.tsx`)
Each button opens one of these content components:

- **PropertiesContent** - Display properties, occupancy charts
- **ResidentsContent** - Resident management and statistics
- **MealsContent** - Meal plans, statistics, weekly menus
- **FinanceContent** - Revenue charts, transactions, profit metrics
- **MaintenanceContent** - Work orders, tickets, facility health
- **StaffContent** - Staff member listings and status
- **SettingsContent** - General and notification settings

## 🚀 Usage Example

```typescript
const { openModal } = useModal();

<Button onClick={() => openModal({
  id: 'properties',
  title: 'Properties',
  component: <PropertiesContent />,
  size: 'xl'
})}>
  View Properties
</Button>
```

## 🎨 Features

✅ **Professional Design**
- Clean, modern interface
- Smooth animations
- Responsive layouts
- Dark mode support

✅ **Functional Buttons**
- All dashboard buttons are now clickable
- Each button displays unique content
- Consistent UI/UX

✅ **Center Screen Display**
- Modal appears in the center of viewport
- Backdrop blur effect
- Smooth scale/fade animations
- Click outside to close

✅ **Multiple Size Options**
- `sm`: 384px max-width
- `md`: 448px max-width
- `lg`: 672px max-width (default)
- `xl`: 896px max-width
- `full`: 1536px max-width

## 📍 Integrated Buttons

### Admin Dashboard (Normal)
- ✅ Quick Search
- ✅ New Entry
- ✅ Full Archive Registry

### Admin Dashboard (Pro)
- ✅ Service Ticket
- ✅ Open Task Board
- ✅ Compliance Audit Download

### Admin Dashboard (Premium)
- ✅ Add Property
- ✅ Full Asset Audit
- ✅ Download Audit
- ✅ Summary Report

### Chef Dashboard
- ✅ Daily Audit
- ✅ New Service
- ✅ Menu Designer

### Tenant Dashboard
- ✅ Digital Key
- ✅ New Request
- ✅ View Activity History
- ✅ Pre-Order Portions

## 🔧 Customization

To add a new modal:

1. Create content component in `modal-contents.tsx`
2. Use `useModal()` hook in your button
3. Call `openModal()` with the component

```typescript
openModal({
  id: 'unique-id',
  title: 'Your Title',
  component: <YourComponent />,
  size: 'lg'
})
```

## 📦 Dependencies

- `framer-motion` - Animations
- `lucide-react` - Icons
- `recharts` - Charts
- Tailwind CSS - Styling

## 🎨 Styling

All modals use the existing Tailwind CSS configuration:
- `bg-card` - Modal background
- `border-border` - Borders
- `text-foreground` - Text color
- Dark mode fully supported

---

**Version:** 1.0  
**Last Updated:** April 2026

# MedAlign Draw.io Structure Guide

This folder contains the app flow draft diagram for **MedAlign**.

## File
- `medalign-app-flow.drawio` → Open with [https://app.diagrams.net](https://app.diagrams.net)

## Included Structure (Exact)
The diagram is organized into **4 swimlanes**:
1. Public / Entry
2. Clinic Internal (Admin + Reception)
3. Doctor Workflow
4. Patient Experience

### Main boxes
- START
- Landing / Marketing Site
- Clinic Onboarding
- Sign In
- Admin Dashboard
- Queue Management
- Doctors Management
- Analytics
- Billing & Plan
- Staff & Role Management
- Receptionist Desk
- Doctor Dashboard
- Rapid Prescription Engine
- Prescription Delivery
- Patient Queue Tracker (PWA)
- Alert Preferences
- Patient Medical Vault
- END

### Main connectors
- START → Landing
- Landing → Clinic Onboarding (Create clinic)
- Landing → Sign In (Login)
- Clinic Onboarding → Admin Dashboard (Setup complete)
- Sign In → Admin Dashboard (Auth success)
- Admin Dashboard → Queue Management / Doctors Management / Analytics / Billing & Plan / Staff & Role Management
- Queue Management → Receptionist Desk (Reception flow)
- Receptionist Desk → Patient Queue Tracker (Token + link sent)
- Receptionist Desk → Doctor Dashboard (Queue updates)
- Doctor Dashboard → Rapid Prescription Engine (Call Next / Complete)
- Rapid Prescription Engine → Prescription Delivery (Generate Rx)
- Prescription Delivery → Patient Medical Vault (Secure link)
- Patient Queue Tracker → Alert Preferences (Set alerts)
- Alert Preferences → Patient Medical Vault (After consult)
- Patient Medical Vault → END (Flow complete)

## How to edit
1. Open `medalign-app-flow.drawio` in Draw.io.
2. Keep swimlane grouping unchanged.
3. If adding features, add only inside the relevant lane.
4. Preserve arrow labels for clarity in pitch/investor decks.

## Suggested next step
Export as PNG + PDF for your presentation and include this under your product architecture section.
